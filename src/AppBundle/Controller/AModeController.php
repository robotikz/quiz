<?php
// src/AppBundle/Controller/PageController.php
namespace AppBundle\Controller;

use AppBundle\Entity\Score;
use AppBundle\Entity\Scorem;
use AppBundle\Entity\User;
use AppBundle\Security\UserGuest;
use AppBundle\Utils\Ses;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Quiz;
use Symfony\Component\HttpFoundation\Cookie;

class AModeController extends DefaultController {

	


	/**
	 * @Route("start0", name="start0")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	// public function start0Action(Request $request) {
	// 	if ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
	// 		//  authenticated (NON anonymous)
	// 		//$this->get('session')->set('quizz', $user['user_id']);
	// 		return $this->render ( 'default/counter.html.twig', array (
	// 		) );
	// 	}else{
	// 		$session = $request->getSession ();
	// 		$authenticationUtils = $this->get('security.authentication_utils');
	// 		// get the login error if there is one
	// 		$error = $authenticationUtils->getLastAuthenticationError();
	// 		// last username entered by the user
	// 		$lastUsername = $authenticationUtils->getLastUsername();
	// 		$activate = $get('session')->get ( "me_acktivate_ok" );
	// 		return $this->render ( 'security/login0.html.twig', array (
	// 				'last_username' => $lastUsername,
	// 				'error' => $error,
	// 				'activate' => $activate,
	// 		) );
	// 	}
	// }

	/**
	 * @Route("qfirsta", name="qfirsta")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function qfirstaAction(Request $request) {
	    // dump($request->headers->get('referer'));
		if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			//$this->setGuest(null,$request);
			//cos guest is off
			return $this->redirect ( $this->generateUrl ( 'home') );
		}

		$this->get('session')->set('quiz_mode', 'a');
		//here goes the logic
		$quiz_id = $this->p('quiz_id');
		if ($quiz_id==null  || $quiz_id==''){
			return $this->redirect ( $this->generateUrl ( 'home') );
		}
		//04.01.2018, astoian - emtpy ids of selected anwers for DND
		$this->get('session')->set('answer_ids_selected'.'_'.$quiz_id, array());

		$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));
		//28.02.2018, astoian - need to init, cos back buttton
		$this->init($quiz->getId());
		//if all questions are done, then hiscore
		$question_ids_done = $this->get('session')->get('question_ids_done'.'_'.$quiz_id);

		//01.10.2018, astoian - set sum in session for show
		$score = $this->em()->getRepository('AppBundle:Score')->findOneBy(
			array('user'=>$this->u()->getId(),'quiz'=>$quiz_id));
		if (!is_null($score))	{
			$this->get('session')->set('quiz_score_sum'.'_'.$quiz_id, ($score->getScoresum()+0));
			// dump( $this->get('session')->get('quiz_score_sum'.'_'.$quiz_id)); 
			// dump( 'quiz_score_sum'.'_'.$quiz_id.'='. $this->get('session')->get('quiz_score_sum'.'_'.$quiz_id)); 
		}

		$questions = array();
		foreach ($quiz->getCats() as $c){
			if (!is_null($c->getQuestioncat()->getQuestions())) {
				//$questions = $questions + $c->getQuestioncat()->getQuestions()->toArray();
				$questions = array_merge($questions,$c->getQuestioncat()->getQuestionsActive()->toArray());
			}
		}
		$questions = array_unique($questions);
		//random order of question
		if ($quiz->getQrandom()==1){
			shuffle($questions);
		}
		if(count($questions)==count($question_ids_done)){
			return $this->redirect ( $this->generateUrl ( 'resulta') );
		}

		//search first question
		$question=null;
		foreach ($questions as $q){
			if (!in_array($q->getId(), $question_ids_done)) {//if NOT question_id in question_ids_done
				$question=$q;
				break;
			}
		}
		if ($question==null){//almost inpossible 
			//throw $this->createNotFoundException ( 'The Logic of the next question-id is out of array range: '.join($question_ids_done));
			return $this->redirect ( $this->generateUrl ( 'resulta') );
		}
		

		$m=-1;
		$answers_right = $this->r('Answer')->findBy(array('parent'=>$question->getId(), 'status'=>'1'));
		if(count($answers_right)>1)$m=1;

		$qn_count=count($questions);

		//show animation dnd if dnd-question for the first time
		if ($question->getDnd()==1){
			if ($request->cookies->get('quiz_ani_dnd') != '1'){
				return $this->render ('default/game.ani.dnd.html.twig', array (
					'question' => $question, 
					'question_next' => $question, 
					'qncount' => $qn_count,
				));
			}
		}

		if ($question->getDnd()==1){
			return $this->render ( 'amode/game.question.dnd.html.twig', array (
					'quiz' => $quiz,
					'question' => $question,
					'm' => $m,
					'qncount' => $qn_count,
			) );
		}else{
			return $this->render ( 'amode/game.question.html.twig', array (
					'quiz' => $quiz,
					'question' => $question,
					'm' => $m,
					'qncount' => $qn_count,
			) );
		}

		
	}

	/**
	 * @Route("qnexta/aj", name="qnexta_aj")
	 *
	 * @param Request $request
	 * @throws NotFoundHttpException
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\JsonResponse
	 */
	public function gnextaAjAction(Request $request)	{
		//*************RIGHTS************************************
		$json=array("e" => 400, "qz" => -1, "qn"=>-1);
		//*************RIGHTS************************************
		if (! $request->isXmlHttpRequest()) {
			return new JsonResponse($json);
		}

		$quiz_id = $request->query->get('qz');
		if ($quiz_id==null  || $quiz_id==''){
			$json=array("e" => 400, "qz" => -1, "qn"=>-1);
			return new JsonResponse($json);
		}
		//04.01.2018, astoian - emtpy ids of selected anwers for DND
		$this->get('session')->set('answer_ids_selected'.'_'.$quiz_id, array());
		//08.11.2017, astoian - for multi answers initiate  the multi ids
		$this->get('session')->set('answer_ids_multi'.'_'.$quiz_id, array());
		//
		$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));

		$question_ids_done = $this->get('session')->get('question_ids_done'.'_'.$quiz_id);

		//11.10.2018, astoian
		//if questin is from qnn (question next)
		$qnnext_id = $request->query->get('qnnext');
		if ($qnnext_id!=null && $qnnext_id!=='' && $qnnext_id!=='undefined'){
			$question = $this->r('Question')->findOneBy(array('id'=>$qnnext_id));
			if ($question==null){
				$json=array("e" => 400, "qz" => $quiz->getId(), "qn"=>-1);
				return new JsonResponse($json);
			}
			//check if next question is not already really done, if so then  error manipulation
			if (in_array($question->getId(), $question_ids_done)) {//if NOT question_id in question_ids_done
				$json=array("e" => 400, "qz" => $quiz->getId(), "qn"=>-1);
				return new JsonResponse($json);
			}
		}else{

			//add current question as done
			$qn_id = $request->query->get('qn');
			if ($qn_id==null  || $qn_id==''){
				$json=array("e" => 400, "qz" => -1, "qn"=>-1);
				return new JsonResponse($json);
			}
			$qn = $this->r('Question')->findOneBy(array('id'=>$qn_id));

			//20.12.2017, astoian - check ads settings
			$quiz_ads_show = $this->get('session')->get('quiz_ads_show'.'_'.$quiz_id);
			if ($quiz->getAds()==1){
				if ( ((count($question_ids_done)+$quiz_ads_show) % $quiz->getAdsafterqn()) == 0 ){
					$content = $this->renderView ( 'default/game.ads.aj.html.twig', array (
						'quiz' => $quiz,
						'question' => $qn,
					) );
					$json=array("e" => 100, "html" => $content,'as' => $quiz->getAdsaftersec());
					$this->get('session')->set('quiz_ads_show'.'_'.$quiz_id,0);
					return new JsonResponse($json);
				}
			}
			$this->get('session')->set('quiz_ads_show'.'_'.$quiz_id,1);

			

			//all question by quiz-cat
			$questions = array();
			foreach ($quiz->getCats() as $c){
				if (!is_null($c->getQuestioncat()->getQuestions())) {
					//$questions = $questions + $c->getQuestioncat()->getQuestions()->toArray();
					$questions = array_merge($questions,$c->getQuestioncat()->getQuestionsActive()->toArray());
				}
			}
			$questions = array_unique($questions);
			//random order of question
			if ($quiz->getQrandom()==1){
				shuffle($questions);
			}

			

			//resulta || highscore
			if(count($questions)==count($question_ids_done)){
				//if repeat questions without stop
				if ($quiz->getQrepeat()==1){
					$this->get('session')->set('question_ids_done'.'_'.$quiz_id, array());
				}else{
					//flag to sum score, after end of game
					$this->get('session')->set('quiz_score_sum_save'.'_'.$quiz_id,'1');
					$json=array("e" => 200, "hs" => 1);//no more question, goto resulta || highscore
					return new JsonResponse($json);
				}
			}else{
				array_push($question_ids_done,$qn->getId());
				$this->get('session')->set('question_ids_done'.'_'.$quiz_id, $question_ids_done);
			}

			$quiz_over = $this->get('session')->get('quiz_over'.'_'.$quiz_id);
			if(count($questions)==count($question_ids_done) || $quiz_over==1){
				//flag to sum score, after end of game
				$this->get('session')->set('quiz_score_sum_save'.'_'.$quiz_id,'1');
				$json=array("e" => 200, "hs" => 1);//no more question, goto resulta || highscore
				return new JsonResponse($json);
			}

			//search next question
			$question=null;
			foreach ($questions as $q){
				if (!in_array($q->getId(), $question_ids_done)) {//if NOT question_id in question_ids_done
					$question=$q;
					break;
				}
			}
		}

		if ($question==null){
			$json=array("e" => 400, "qz" => $quiz->getId(), "qn"=>-1);
			//throw $this->createNotFoundException ( 'The Logic of the next question-id is out of array range: '.join($question_ids_done));
			return new JsonResponse($json);
		}

		$m=-1;
		$answers_right = $this->r('Answer')->findBy(array('parent'=>$question->getId(), 'status'=>'1'));
		if(count($answers_right)>1)$m=1;

		//show animation dnd if dnd-question for the first time
		if ($question->getDnd()==1){
			if ($request->cookies->get('quiz_ani_dnd') != '1'){
				$content = $this->renderView ( 'default/game.ani.dnd.aj.html.twig', array (
					'question' => $qn, 
					'question_next' => $question, 
				));
				$json=array("e" => 200, "html" => $content);
				return new JsonResponse($json);
			}
		}

		if ($question->getDnd()==1){
			$content = $this->renderView ( 'amode/game.question.dnd.aj.html.twig', array (
				'question' => $question,
				'quiz' => $quiz,
				'm' => $m,
		) );
		}else{
			$content = $this->renderView ( 'amode/game.question.aj.html.twig', array (
				'question' => $question,
				'quiz' => $quiz,
				'm' => $m,
			) );
		}

		$json=array("e" => 200, "html" => $content);

		return new JsonResponse($json);
	}


	

	/**
	 * @Route("qsela/aj", name="qsela_aj")
	 *
	 * @param Request $request
	 * @throws NotFoundHttpException
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\JsonResponse
	 */
	public function selectAjAction(Request $request)
	{
		//*************RIGHTS************************************
		$json=array("e" => 400, "a" => -1);
		//*************RIGHTS************************************
		if (! $request->isXmlHttpRequest()) {
			return new JsonResponse($json);
		}
		$quiz_id = $request->query->get('qz');
		$question_id = $request->query->get('qn');
		$a_id = $request->query->get('a');

		//check if the answer already selected, then give no chance
		$answer_ids_selected = $this->get('session')->get('answer_ids_selected'.'_'.$quiz_id);
		if(!$answer_ids_selected) $answer_ids_selected=array();
		if (in_array($a_id, $answer_ids_selected)) {//if answer_id in $answer_ids_selected
			return new JsonResponse($json);
		}
		array_push($answer_ids_selected,$a_id);
		$this->get('session')->set('answer_ids_selected'.'_'.$quiz_id, $answer_ids_selected);

		//here goes the logic
		$quiz_id = $this->p('quiz_id');
		if ($quiz_id==null  || $quiz_id==''){
			return new JsonResponse($json);
		}
		$question = $this->em()->getRepository('AppBundle:Question')->find($question_id);
		if ($question==null){
			return new JsonResponse($json);
		}

		$answer=$this->r('Answer')->findOneBy(array('id'=>$a_id));

		$answers_right = $this->r('Answer')->findBy(array('parent'=>$question_id, 'status'=>'1'));
		if(count($answers_right)>1){
			//if joker 50/50 is selected, then get only one answer-correct
			if ($this->get('session')->get('joker_5050_qn'.'_'.$quiz_id)==$question->getId()){
				$answers_right = $this->r('Answer')->findBy(array('id'=>$this->get('session')->get('joker_5050_a'.'_'.$quiz_id)));
			}
		}
		$solution='';
		if ($question->getSolution()==1){
			$solution = $answer->getSolution();
		}

		if ($answer) {
			
			if ($answer->getStatus()==1){//user has answered correctly
				$quiz_score = $this->get('session')->get('quiz_score'.'_'.$quiz_id);
				if(count($answers_right)>1){
					$answer_ids_multi = $this->get('session')->get('answer_ids_multi'.'_'.$quiz_id);
					if(!$answer_ids_multi)	$answer_ids_multi=array();
					array_push($answer_ids_multi, $a_id);
					$this->get('session')->set('answer_ids_multi'.'_'.$quiz_id, $answer_ids_multi);
				}
				if(count($answers_right)>1){
					//if all multi-selected answers are selected, then m=0, if not yet m=1
					if (count($answers_right)==count($answer_ids_multi)){
						//scores++ for multi if the last right-answer
						if($quiz_score==-1)$quiz_score=0;
						$quiz_score++;//simple formula to count the user score :))))
						$this->get('session')->set('quiz_score'.'_'.$quiz_id,$quiz_score);
						//the last right selected answer
						$json=array("e" => 200, "a" => $answer->getId(), "r"=>$answer->getId(), "s"=>$quiz_score, 'm'=>0,'as'=>$solution);
						// put all answers as selected, in order dont give a chance to select again
						// foreach ($question->getAnswers() as $a){
						// 	if (!in_array($a->getId(), $answer_ids_selected)) {//if answer_id is NOT in $answer_ids_selected
						// 		array_push($answer_ids_selected,$a->getId());
						// 	}
						// }
						// $this->get('session')->set('answer_ids_selected'.'_'.$quiz_id, $answer_ids_selected);
					}else{
						if($quiz_score==-1)$quiz_score=0;
						//if muli-answers are not all selected in ui, dont put all in  $answer_ids_selected
						$json=array("e" => 200, "a" => $answer->getId(), "r"=>$answer->getId(), "s"=>$quiz_score, 'm'=>1,'as'=>'');
					}
				}else{
					//scores++ normal if one right-answer only
					if($quiz_score==-1)$quiz_score=0;
					$quiz_score++;//simple formula to count the user score :))))
					$this->get('session')->set('quiz_score'.'_'.$quiz_id,$quiz_score);
					//put all answers as selected, in order dont give a chance to select again, sucure is secure
					// foreach ($question->getAnswers() as $a){
					// 	if (!in_array($a->getId(), $answer_ids_selected)) {//if answer_id is NOT in $answer_ids_selected
					// 		array_push($answer_ids_selected,$a->getId());
					// 	}
					// }
					//if not multi-selected, then m=-1
					$json=array("e" => 200, "a" => $answer->getId(), "r"=>$answer->getId(), "s"=>$quiz_score, 'm'=>-1,'as'=>$solution);
				}

				return new JsonResponse($json);
			}else{
				//flag to sum score, after end of game
				$this->get('session')->set('quiz_score_sum_save'.'_'.$quiz_id,'1');
				// wrong answer, then the answer 0
				$this->get('session')->set('quiz_over'.'_'.$quiz_id,1);
				$r=array();
				foreach ($question->getAnswers() as $answer){
					if ($answer->getStatus()==1) array_push($r, $answer->getId());
				}
				$json=array("jcode" => 200, "a" => 0, "r"=>$r,'m'=>-1,'as'=>$solution);
				return new JsonResponse($json);
			}
		} else {
			// no such answer is found, then the answer is false
			$json=array("jcode" => 400, "a" => -1, "r"=>[],'m'=>-1);
			return new JsonResponse($json);
		}

	}

	/**
	 * @Route("qseladnd/aj", name="qseladnd_aj")
	 *
	 * @param Request $request
	 * @throws NotFoundHttpException
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\JsonResponse
	 */
	public function selectDnDAjAction(Request $request)
	{
		//*************RIGHTS************************************
		$json=array("e" => 400, "a" => -1);
		//*************RIGHTS************************************
		if (! $request->isXmlHttpRequest()) {
			return new JsonResponse($json);
		}
		$quiz_id = $request->query->get('qz');
		$question_id = $request->query->get('qn');
		$a_id = $request->query->get('a');
		$sd = $request->query->get('sd');

		//check if the answer already selected, then give no chance
		$answer_ids_selected = $this->get('session')->get('answer_ids_selected'.'_'.$quiz_id);
		if(!$answer_ids_selected) $answer_ids_selected=array();
		if (in_array($a_id, $answer_ids_selected)) {//if answer_id in $answer_ids_selected
			return new JsonResponse($json);
		}
		array_push($answer_ids_selected,$a_id);
		$this->get('session')->set('answer_ids_selected'.'_'.$quiz_id, $answer_ids_selected);

		//here goes the logic
		$quiz_id = $this->p('quiz_id');
		if ($quiz_id==null  || $quiz_id==''){
			return new JsonResponse($json);
		}
		$question = $this->em()->getRepository('AppBundle:Question')->find($question_id);
		if ($question==null){
			return new JsonResponse($json);
		}

		$answer=$this->r('Answer')->findOneBy(array('id'=>$a_id));

		$answers_right = $this->r('Answer')->findBy(array('parent'=>$question_id, 'status'=>'1'));
		

		if ($answer) {
			$answer_last = 0;
			//init variable $quiz_score if last selected answer
			$quiz_score = $this->get('session')->get('quiz_score'.'_'.$quiz_id);
			if($quiz_score==-1)$quiz_score=0;
			
			if ($answer->getStatus()==1 && $sd == 1){ //user has answered correctly and right side
				if (count($question->getAnswers())==count($answer_ids_selected)){
					$quiz_score++; //simple formula to count the user score :))))
					$this->get('session')->set('quiz_score'.'_'.$quiz_id,$quiz_score);
					$answer_last = 1;
				}
				//return right side
				$json=array("e" => 200, "a" => $answer->getId(), "r"=>1,  "sd"=>$sd, "s"=>$quiz_score, "l"=>$answer_last);
				return new JsonResponse($json);
			}else if ($answer->getStatus()!=1 && $sd == 2){ //user has answered wrong and left side
				if (count($question->getAnswers())==count($answer_ids_selected)){
					$quiz_score++; //simple formula to count the user score :))))
					$this->get('session')->set('quiz_score'.'_'.$quiz_id,$quiz_score);
					$answer_last = 1;
				}
				//return right side
				$json=array("e" => 200, "a" => $answer->getId(), "r"=>2, "sd"=>$sd, "s"=>$quiz_score, "l"=>$answer_last);
				return new JsonResponse($json);
			}else{// the answer with wrong side
				//flag to sum score, after end of game
				$this->get('session')->set('quiz_score_sum_save'.'_'.$quiz_id,'1');
				$this->get('session')->set('quiz_over'.'_'.$quiz_id,1);
				$r=array();
				foreach ($question->getAnswers() as $answer){
					if ($answer->getStatus()==1) array_push($r, $answer->getId());
				}
				$json=array("jcode" => 200, "a" => 0, "r"=>-1);
				return new JsonResponse($json);
			}
		} else {
			// no such answer is found, then the answer is false
			$json=array("jcode" => 400, "a" => -1, "r"=>[],'m'=>-1);
			return new JsonResponse($json);
		}

	}

	/**
	 * @Route("resulta", name="resulta") 
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function resultaAction(Request $request) {
		$quiz_id = $this->p('quiz_id');
		if (is_null($quiz_id)  || $quiz_id===''){
			throw $this->createNotFoundException ( sprintf($this->p('msg_default_var_not_found'),'quiz_id') );
			//return $this->redirect ( $this->generateUrl ( 'home') );
		}
		$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));

		//check mode of the game
		$quiz_mode = $this->get('session')->get('quiz_mode');
		if ((is_null($quiz_mode)  || $quiz_mode==='' || $quiz_mode=='b')){
			return $this->redirect ( $this->generateUrl ( 'home') );
		}

		$quiz_score = $this->get('session')->get('quiz_score'.'_'.$quiz_id);
		if ((is_null($quiz_score)  || $quiz_score==='' || $quiz_score==-1)){
			//throw $this->createNotFoundException ( sprintf($this->p('msg_default_var_not_found'),'quiz_score'););
			//return $this->redirect ( $this->generateUrl ( 'nodata') );
			$this->get('session')->set('quiz_score'.'_'.$quiz_id,'0');
			$quiz_score = 0;
		}
		
		//26.09.2017, astoian - Guest is already set
		// if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			// $this->setGuest();
		// }
		
		//if no result-page, then goto highscore
		if ($quiz->getAnalysis()==1){
			$evaluation = null;
			if ($quiz->getAnalysisi()==1){//individual by quiz-scores
				$evaluation = $this->r('Evaluation')->getEvaluationByQuizScore($quiz_id,$quiz_score);
			}else{//standard evaluation
				$evaluation = $this->r('PlaceHolder')->findOneBy(array('ph'=>'[#quiz_evaluation#]'));
			}
		}
		
		
		//user is anonymous
		if ($this->u()==null){
			$this->get('session')->set ( "m",  $this->p('msg_default_user_is_anonymous'));
			return $this->render ('security/error.html.twig');
			// throw $this->createNotFoundException ( $this->p('msg_default_user_is_anonymous') );
		}else{
			// to save in the db, only for registired users
			$score = $this->em()->getRepository('AppBundle:Score')->findOneBy(
				array('user'=>$this->u()->getId(),'quiz'=>$quiz_id));
			if ($score){
				//before save new score, save actual score as temp data
				$this->get('session')->set('quiz_score_old'.'_'.$quiz_id,$score->getScore());
				// sum scores
				$quiz_score_sum_save = $this->get('session')->get('quiz_score_sum_save'.'_'.$quiz_id);
				if ($quiz_score_sum_save=='1'){
					$score->setScoresum($quiz_score + $score->getScoresum());
					$this->em()->flush($score);
					$this->get('session')->set('quiz_score_sum_save'.'_'.$quiz_id,'');
					$this->get('session')->set('quiz_score_sum'.'_'.$quiz_id, ($score->getScoresum()+0));
				}
				//overwrite if the rusult is besser 
				if ($quiz_score > $score->getScore()){
					$score->setScore($quiz_score);
					$this->em()->flush($score);
				}
			}else{
				//before save new score, save actual score as temp data
				$this->get('session')->set('quiz_score_old'.'_'.$quiz_id,$quiz_score);
				$score = new Score();
				$score->setUser($this->u());
				$score->setQuiz($quiz);
				$score->setScore($quiz_score);
				$score->setScoresum($quiz_score);
				$this->get('session')->set('quiz_score_sum'.'_'.$quiz_id, ($score->getScoresum()+0));
			}
			// $d=new \DateTime("now");
			$month = date("n");
			$year = date("Y");
			$scorem = $this->em()->getRepository('AppBundle:Scorem')->getScoremByUserQuizYM(
				$this->u()->getId(),$quiz_id,$month,$year);
			if ($scorem){
				//before save new score, save actual score as temp data
				$this->get('session')->set('quiz_scorem_old'.'_'.$quiz_id,$scorem->getScore());
				//overwrite if the rusult is besser 
				if ($quiz_score > $scorem->getScore()){
					$scorem->setScore($quiz_score);
					$this->em()->flush($scorem);
				}
			}else{
				//before save new score, save actual score as temp data
				$this->get('session')->set('quiz_scorem_old'.'_'.$quiz_id,$quiz_score);
				$scorem = new Scorem();
				$scorem->setUser($this->u());
				$scorem->setQuiz($quiz);
				$scorem->setScore($quiz_score);
				$scorem->setM($month);
				$scorem->setY($year);
			}

			if ($this->u()->getStatus()===9){
				$this->get('session')->set('guest_score'.'_'.$quiz_id,$score);
				$this->get('session')->set('guest_scorem'.'_'.$quiz_id,$scorem);
			}
			if ($this->u()->getStatus()===9){
			}else{
				//save the result in the table, if user is real
				$this->em()->persist($score);
				$this->em()->persist($scorem);
				$this->em()->flush();
			}
			//if no result-page, then goto highscore
			if ($quiz->getAnalysis()==0){
				return $this->redirect ( $this->generateUrl ( 'highscore') );
			}
				
			if ($this->u()->getStatus()===9){
				// $this->get('session')->set('guest_score',$score);
				// $this->get('session')->set('guest_scorem',$scorem);
				return $this->render ( 'amode/result.anonymous.html.twig', array (
						'quiz'=>$quiz,
						'evaluation' => $evaluation
				) );
			}else{
				//save the result in the table, see upper, it could be redirected, if no analysis
				return $this->render ( 'amode/result.user.html.twig', array (
						'quiz'=>$quiz,
						'evaluation' => $evaluation
				) );
			}
			
		}
	}

	/**
	 * @Route("hs", name="highscore")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function highscoreAction(Request $request) {
		$quiz_id = $this->p('quiz_id');
		if ($quiz_id==null  || $quiz_id==''){
			return $this->redirect ( $this->generateUrl ( 'home') );
		}
		$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));

		$this->get('session')->set('redirect','highscore');
		$quiz_score = $this->get('session')->get('quiz_score'.'_'.$quiz_id);
		if ((is_null($quiz_score)  || $quiz_score==='' || $quiz_score==-1)
				&& !$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
					//throw $this->createNotFoundException ( 'Vairable quiz_score is not found');
					return $this->redirect ( $this->generateUrl ( 'lgn') );
		}

		if (is_null($quiz_score)  || $quiz_score==='' || $quiz_score==-1){
			$quiz_score=-1;
		}
		$quiz_score_old = $this->get('session')->get('quiz_score_old'.'_'.$quiz_id);
		$quiz_scorem_old = $this->get('session')->get('quiz_scorem_old'.'_'.$quiz_id);
		//titles - of screens
		$screenhighscore = $this->em()->getRepository('AppBundle:ScreenHighscore')->findOneBy(
			array('quiz'=>$quiz_id));
		$title_def = null;
		if (is_null($screenhighscore)){
			$title_m = $this->p('screen_highscore_titlem2');
			$title_a = $this->p('screen_highscore_titlea2');
		}else{
			$title_m = $screenhighscore->titlem2;
			$title_a = $screenhighscore->titlea2;
			$title_no = $screenhighscore->title9;
		}
		
		
		//12.10.2017, astoian - if guest is after log-in
		//after registration ???
		//afte FB??
		if ($this->u()->getStatus()!=9){
			$guest_score = $this->get('session')->get('guest_score'.'_'.$quiz_id);
			if (!is_null($guest_score)){
				$score = $this->em()->getRepository('AppBundle:Score')->findOneBy(
					array('user'=>$this->u()->getId(),'quiz'=>$quiz_id));
				if ($score){
					// sum scores
					$quiz_score_sum_save = $this->get('session')->get('quiz_score_sum_save'.'_'.$quiz_id);
					if ($quiz_score_sum_save=='1'){
						$score->setScoresum($quiz_score + $score->getScoresum()); 
						$this->em()->flush($score);
						$this->get('session')->set('quiz_score_sum_save'.'_'.$quiz_id,'');
						$this->get('session')->set('quiz_score_sum'.'_'.$quiz_id, ($score->getScoresum()+0));
					}
					//overwrite if the rusult is besser 
					if ($quiz_score > $score->getScore()){ //$score->getScore()){
						$title_a = $screenhighscore->titlea3; //$this->p('screen_highscore_titlea3');
						$score->setScore($guest_score->getScore());
						$this->em()->flush($score);
					}elseif ($quiz_score>0 && $quiz_score < $score->getScore()){//$score->getScore()){
						$title_a = $screenhighscore->titlea1; //$this->p('screen_highscore_titlea1');
					}
				}else{
					$guest_score->setUser($this->u());
					$guest_score->setQuiz($quiz);
					$this->em()->persist($guest_score);
					$this->em()->flush($guest_score);
				}
				$this->get('session')->remove('guest_score'.'_'.$quiz_id);
			}
			$guest_scorem = $this->get('session')->get('guest_scorem'.'_'.$quiz_id);
			if (!is_null($guest_scorem)){
				// $d=new \DateTime("now");
				$month = date("n");
				$year = date("Y");
				$scorem = $this->em()->getRepository('AppBundle:Scorem')->getScoremByUserQuizYM(
					$this->u()->getId(),$quiz_id,$month,$year);
				if ($scorem){
					//overwrite if the rusult is besser 
					if ($quiz_score > $scorem->getScore()){//$scorem->getScore()){
						$title_m = $screenhighscore->titlem3; //$this->p('screen_highscore_titlem3');
						$scorem->setScore($guest_scorem->getScore());
						$this->em()->flush($scorem);
					}elseif ($quiz_score>0 && $quiz_score > $score->getScore()){//$scorem->getScore()){
						$title_m = $screenhighscore->titlem1; //$this->p('screen_highscore_titlem1');
					}
				}else{
					$guest_scorem->setUser($this->u());
					$guest_scorem->setQuiz($quiz);
					$this->em()->persist($guest_scorem);
					$this->em()->flush();
				}
				$this->get('session')->remove('guest_scorem'.'_'.$quiz_id);
			}
		}
		
		
		
		//$month=new \DateTime("now");
		//$month->setDate(DATE_FORMAT($month, 'Y'),DATE_FORMAT($month, 'm'),01);
		// $d=new \DateTime("now");
		$month = date("n");
		$year = date("Y");
		$scores = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYM(
			$quiz_id,$month,$year,$quiz->hsnumber);
		if ($this->u()->getStatus()===9){
			//$this->setGuest();
			$count = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMCount($quiz_id,$month,$year);
			$score = $this->get('session')->get('guest_scorem'.'_'.$quiz_id);
			if (!isset($score)){
				//return $this->redirect ( $this->generateUrl ( 'nodata') );
			}
			$pos=-1;
			if (isset($score)){//14.08.2018, astoian - if not played
				$pos=9999999;
				if (!empty($scores)) {
					$score_last = end($scores);
					//dump($score_last);
					// dump($score);
					if ($score_last->getScore() <= $score->getScore()){
						array_push($scores, $score);
						$this->scores_sort_pos($score,$scores,$pos);//position is not in use!!!
					}else if($count < $quiz->hsnumber){
						array_push($scores, $score);
						$this->scores_sort_pos($score,$scores,$pos);//position is not in use!!!
					}
					$pos = 1 + $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMPos($quiz_id,$month,$year,$score->getScore());
				}else{
					array_push($scores, $score);
					$pos=1;
				}
				if ($quiz_score==-1) $title_no = $this->p('screen_highscore_titlem4');	
			}else{
				$title_no = $this->p('screen_highscore_titlem_no');	
			}
			
			$count++;//cos geust is not in the DB
		}else{
			$score = $this->em()->getRepository('AppBundle:Scorem')->getScoremByUserQuizYM($this->u()->getId(),$quiz_id,$month,$year);
			if (is_null($score)){//if not played in this month
				// return $this->redirect ( $this->generateUrl ( 'nodatam') );
			}
			//   dump($quiz_score);
			//   dump($quiz_scorem_old);
			//   dump($score->getScore());
			if ($quiz_score > $quiz_scorem_old){//$score->getScore()){
				$title_m = $screenhighscore->titlem3; //$this->p('screen_highscore_titlem3');
			}elseif ($quiz_score>0 && $quiz_score < $quiz_scorem_old){//$score->getScore()){
				$title_m = $screenhighscore->titlem1; //$this->p('screen_highscore_titlem1');
			}
			$count = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMCount($quiz_id,$month,$year);
			$pos = -1;
			if (!is_null($score)){//if not played in this month
				$pos = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMPos($quiz_id,$month,$year,$score->getScore());
				if ($quiz_score==-1) $title_no = $this->p('screen_highscore_titlem4');	
			}else{
				$title_no = $this->p('screen_highscore_titlem_no');	
			}
		}
		
		
		if ($this->u()==null){
			$this->get('session')->set ( "m",  $this->p('msg_default_user_is_anonymous'));
			return $this->render ('security/error.html.twig');
			// throw $this->createNotFoundException ( 'Benutzer ist anonymous');	
		}

		// $scores_less = $this->em()->getRepository('AppBundle:Score')->getScoreByQuizAllLessScore($quiz_id,$score->getScore(),1);
		// $scores_more = $this->em()->getRepository('AppBundle:Score')->getScoreByQuizAllMoreScore($quiz_id,$score->getScore(),1);
		// dump($scores_less);
		// dump($scores_more);
		if ($quiz_score<=0){
			$title_m = null;
			$title_a = null;
		}
		
		if ($this->u()->getStatus()===9){
			return $this->render ( 'default/highscore.anonymous.html.twig', array (
					'quiz'=>$quiz,
					'score'=>$score,
					'scores'=>$scores,
					'pos'=>$pos,
					'count'=>$count,
					'score_now'=>$quiz_score,
					'title_m'=>$title_m,
					'title_a'=>$title_a,
					'title_def'=>$title_def,
					'title_no'=>$title_no
			) );
		}else{
			return $this->render ( 'default/highscore.user.html.twig', array (
					'quiz'=>$quiz,
					'score'=>$score,
					'scores'=>$scores,
					'pos'=>$pos,
					'count'=>$count,
					'score_now'=>$quiz_score,
					'title_m'=>$title_m,
					'title_a'=>$title_a,
					'title_def'=>$title_def,
					'title_no'=>$title_no
			) );
		}
	}
	
	/**
	 * Load table for month or for all-time
	 * @Route("hs/aj", name="hs_aj")
	 */
	public function highscoreAjAction(Request $request) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		//*************RIGHTS************************************
		//*************RIGHTS************************************
	
		// if (! $request->isXmlHttpRequest()) {
		// 	throw new NotFoundHttpException();
		// }
	
		$act = $request->query->get('act');
		$quiz_id = $request->query->get('id');
		$count_current = $request->query->get('cc');
		$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));
		if ($count_current==0){
			$limit = $quiz->hsnumber; 
		}else{
			$limit = $count_current+3; 
		}
		
		$scores = array();
		
		$quiz_score = $this->get('session')->get('quiz_score'.'_'.$quiz_id);
		if (is_null($quiz_score)  || $quiz_score==='' || $quiz_score==-1){
			$quiz_score=-1;
		}

		$quiz_score_old = $this->get('session')->get('quiz_score_old'.'_'.$quiz_id);
		$quiz_scorem_old = $this->get('session')->get('quiz_scorem_old'.'_'.$quiz_id);

		$screenhighscore = $this->em()->getRepository('AppBundle:ScreenHighscore')->findOneBy(
			array('quiz'=>$quiz_id));
		if (is_null($screenhighscore)){
			$title_def = $this->p('screen_highscore_titlem2');
		}else{
			$title_def = $screenhighscore->titlem2;
			$title_no = $screenhighscore->title9;
		}
		$title_m = null;
		$title_a = null;
		$pos=-1;
		
		//init current user
		if ($act=="month"){
			$title_m = $screenhighscore->titlem2; //$this->p('screen_highscore_titlem2');
			// $month=new \DateTime("now");
			// $month->setDate(DATE_FORMAT($month, 'Y'),DATE_FORMAT($month, 'm'),01);
			$month = date("n");
			$year = date("Y");
			$scores = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYM(
				$quiz_id,$month,$year,$limit);
			
			if ($this->u()->getStatus()===9){
				// $this->setGuest();
				$count = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMCount($quiz_id,$month,$year);
				$score = $this->get('session')->get('guest_scorem'.'_'.$quiz_id);
				$pos=-1;
				if (isset($score)){//14.08.2018, astoian - if not played
					$pos=9999999;
					$score_last = end($scores);
					if ($score_last->getScore() <= $score->getScore()){
						array_push($scores, $score);
						$this->scores_sort_pos($score,$scores,$pos);//position is not in use!!!
					}else if($count < $quiz->hsnumber){
						array_push($scores, $score);
						$this->scores_sort_pos($score,$scores,$pos);//position is not in use!!!
					}
					if (!is_null($score)){//if not played in this month
						$pos = 1 + $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMPos($quiz_id,$month,$year,$score->getScore());
						if ($quiz_score==-1) $title_no = $this->p('screen_highscore_titlem4');	
					}else{
						$title_no = $this->p('screen_highscore_titlem_no');
					}
				}
				$count++;//cos geust is not in the DB
			}else{
				$score = $this->em()->getRepository('AppBundle:Scorem')->getScoremByUserQuizYM(
					$this->u()->getId(),$quiz_id,$month,$year);
				$count = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMCount(
					$quiz_id,$month,$year);
				if (!is_null($score)){//if not played in this month
					$pos = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMPos($quiz_id,$month,$year,$score->getScore());
					if ($quiz_score==-1) $title_no = $this->p('screen_highscore_titlem4');	
				}else{
					$title_no = $this->p('screen_highscore_titlem_no');
				}
				//title - nonth
				if ($quiz_score > $quiz_scorem_old){//$score->getScore()){
					$title_m = $screenhighscore->titlem3; //$this->p('screen_highscore_titlem3');
				}elseif ($quiz_score < $quiz_scorem_old){//$score->getScore()){
					$title_m = $screenhighscore->titlem1; //$this->p('screen_highscore_titlem1');
				}
			}
		}else if ($act=="all"){
			$title_a = $screenhighscore->titlea2; //$this->p('screen_highscore_titlea2');
			$scores = $this->em()->getRepository('AppBundle:Score')->getScoreByQuizAll(
				$quiz_id,$limit);
			if ($this->u()->getStatus()===9){
				// $this->setGuest();
				$score = $this->get('session')->get('guest_score'.'_'.$quiz_id);
				$pos=-1;
				if (isset($score)){//14.08.2018, astoian - if not played
					$pos=9999999;
					$score_last = end($scores);
					if ($score_last->getScore() <= $score->getScore()){
						array_push($scores, $score);
						$this->scores_sort_pos($score,$scores,$pos);//position is not in use!!!
					}
					$pos = 1 + $this->em()->getRepository('AppBundle:Score')->getScoreByQuizAllPos($quiz_id,$score->getScore());
					if ($quiz_score==-1) $title_no = $this->p('screen_highscore_titlea4');	
				}else{
					$title_no = $this->p('screen_highscore_titlea_no');
				}
						
				$count = $this->em()->getRepository('AppBundle:Score')->getScoreByQuizAllCount($quiz_id);
				$count++;//cos geust is not in the DB
			}else{
				$score = $this->em()->getRepository('AppBundle:Score')->findOneBy(array('user'=>$this->u()->getId(),'quiz'=>$quiz_id));
				$count = $this->em()->getRepository('AppBundle:Score')->getScoreByQuizAllCount($quiz_id);
				if (!is_null($score)){//if not played in this month
					$pos = $this->em()->getRepository('AppBundle:Score')->getScoreByQuizAllPos($quiz_id,$score->getScore());
					if ($quiz_score==-1) $title_no = $this->p('screen_highscore_titlea4');	
				}else{
					$title_no = $this->p('screen_highscore_titlea_no');
				}
				//title all
				if ($quiz_score > $quiz_score_old){//$score->getScore()){
					$title_a = $screenhighscore->titlea3; //$this->p('screen_highscore_titlea3');
				}elseif ($quiz_score < $quiz_score_old){//$score->getScore()){
					$title_a = $screenhighscore->titlea1; //$this->p('screen_highscore_titlea1');
				}
			}
			
		}elseif ($act=="mymonth"){
			$title_m = $screenhighscore->titlem2; //$this->p('screen_highscore_titlem2');
			// $month=new \DateTime("now");
			// $month->setDate(DATE_FORMAT($month, 'Y'),DATE_FORMAT($month, 'm'),01);
			$month = date("n");
			$year = date("Y");
			
			if ($this->u()->getStatus()===9){
				// $this->setGuest();
				$score = $this->get('session')->get('guest_scorem'.'_'.$quiz_id);
			}else {
				$score = $this->em()->getRepository('AppBundle:Scorem')->getScoremByUserQuizYM(
					$this->u()->getId(),$quiz_id,$month,$year);
				//title my-month
				if ($quiz_score > $quiz_scorem_old){//$score->getScore()){
					$title_m = $screenhighscore->titlem3; //$this->p('screen_highscore_titlem3');
				}elseif ($quiz_score < $quiz_scorem_old){//$score->getScore()){
					$title_m = $screenhighscore->titlem1; //$this->p('screen_highscore_titlem1');
				}
			}
			$scores_less = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMLessScore(
				$quiz_id,$month,$year,$score->getScore(),$limit/2);
			$scores_more = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMMoreScore(
				$quiz_id,$month,$year,$score->getScore(),$limit/2);
			array_push($scores_more,$score);
			$scores = array_merge($scores_more,$scores_less);
			$count = 0;
			$pos = $this->em()->getRepository('AppBundle:Scorem')->getScoremByQuizYMPos(
					$quiz_id,$month,$year,$score->getScore());
		}else if ($act=="myall"){
			$title_a = $screenhighscore->titlea2; //$this->p('screen_highscore_titlea2');
			if ($this->u()->getStatus()===9){
				$score = $this->get('session')->get('guest_score'.'_'.$quiz_id);
			}else{
				$score = $this->em()->getRepository('AppBundle:Score')->findOneBy(array('user'=>$this->u()->getId(),'quiz'=>$quiz_id));
				//title my-all
				if ($quiz_score > $quiz_score_old){//$score->getScore()){
					$title_a = $screenhighscore->titlea3; //$this->p('screen_highscore_titlea3');
				}elseif ($quiz_score < $quiz_score_old){//$score->getScore()){
					$title_a = $screenhighscore->titlea1; //$this->p('screen_highscore_titlea1');
				}
			}
			$scores_less = $this->em()->getRepository('AppBundle:Score')->getScoreByQuizAllLessScore(
				$quiz_id,$score->getScore(),$limit/2);
			$scores_more = $this->em()->getRepository('AppBundle:Score')->getScoreByQuizAllMoreScore(
				$quiz_id,$score->getScore(),$limit/2);
			array_push($scores_more,$score);
			$scores = array_merge($scores_more,$scores_less);
			$count = 0;
			$pos = $this->em()->getRepository('AppBundle:Score')->getScoreByQuizAllPos(
					$quiz_id,$score->getScore());
		}
		
		$content = $this->
		renderView ( 'default/highscore.user.table.html.twig', array (
				'scores'=>$scores,
				'pos'=>$pos,
				'count'=>$count
		) );
		// dump($content);
		// return new Response('empty');
		if ($quiz_score<0){
			$title_m = null;
			$title_a = null;
			$title_def = null;
		}
		$title = $this->
		renderView ( 'default/highscore.user.title.html.twig', array (
				'score'=>$score,
				'pos'=>$pos,
				'score_now'=>$quiz_score,
				'title_m'=>$title_m,
				'title_a'=>$title_a,
				'title_def'=>$title_def,
				'title_no'=>$title_no
		) );
		$json=array("e" => 200, "html" => $content, "title"=>$title);
	
		return new JsonResponse($json);
	}


	/**
	 * @Route("fb/share", name="fb_share")
	 *
	 * @param Request $request 
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	// public function fbSharetAction(Request $request) {
	// 	return $this->render ( 'default/fb.share.html.twig', array ( 
	// 	) );
	// }



	


	/**
	* sort scores and find position of given score
	* @param $score
	* @param &$scores
	* @param &$pos
	*/
	private function scores_sort_pos($score, &$scores, &$pos){
		usort( $scores, function ( $a, $b ) {
			$al = $a->score;
			$bl = $b->score;
			if ($al == $bl) return 0;
			return ($al < $bl) ? +1 : -1;//DESC
		} );
		
		foreach ( $scores as $k => $v ) {
			if ( $score->id == $v->id ) {
				$pos=$k+1;
				break;
			}
		}
	}

	/**
	 * @Route("nodata", name="nodata")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function nodataAction(Request $request) {
		return $this->render ( 'amode/result.nodata.html.twig', array (
			"nd_msg"=>$this->p('msg_no_data_now')
		) );
	}

	/**
	 * @Route("nodatam", name="nodatam")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function nodatamAction(Request $request) {
		return $this->render ( 'amode/result.nodata.html.twig', array (
			"nd_msg"=>$this->p('msg_no_data_month')
		) );
	}
}
