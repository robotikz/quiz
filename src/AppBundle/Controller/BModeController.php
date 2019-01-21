<?php
// src/AppBundle/Controller/XXController.php
namespace AppBundle\Controller;

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


class BModeController extends DefaultController {

	/**
	 * @Route("start0b", name="start0b")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function start0bAction(Request $request) {
		
		
		$this->get('session')->set('quiz_mode', 'b');
		if ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			//  authenticated (NON anonymous)
			//$this->get('session')->set('quizz', $user['user_id']);
			//here goes the logic
			$quiz_id = $this->p('quiz_id');
			if ($quiz_id==null  || $quiz_id==''){
				return $this->redirect ( $this->generateUrl ( 'home') );
			}
			$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));
			$this->init($quiz->getId());
			$questions = array();
			foreach ($quiz->getCats() as $c){
				if (!is_null($c->getQuestioncat()->getQuestions())) {
					//$questions = $questions + $c->getQuestioncat()->getQuestions()->toArray();
					$questions = array_merge($questions,$c->getQuestioncat()->getQuestionsActive()->toArray());
				}
			}
			$questions = array_unique($questions);
			return $this->render ( 'bmode/start0.html.twig', array (
				'question_count_play' => count($questions),
			) );
		}else{
			$authenticationUtils = $this->get('security.authentication_utils');
			// get the login error if there is one
			$error = $authenticationUtils->getLastAuthenticationError();
			// last username entered by the user
			$lastUsername = $authenticationUtils->getLastUsername();
			$activate = $this->get('session')->get ( "me_acktivate_ok" );
			return $this->render ( 'security/login0.html.twig', array (
					'last_username' => $lastUsername,
					'error' => $error,
					'activate' => $activate,
			) );
		}
	}
	
	
	/**
	 * @Route("qfirstb/{count}", name="qfirstb")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function qfirstbAction(Request $request, $count = 0) {
	    // dump($request->headers->get('referer'));
		if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			//$this->setGuest(null,$request);
			//cos guest is off
			return $this->redirect ( $this->generateUrl ( 'home') );
		}

		//here goes the logic
		$quiz_id = $this->p('quiz_id');
		if ($quiz_id==null  || $quiz_id==''){
			return $this->redirect ( $this->generateUrl ( 'home') );
		}

		switch ($count) {
			case 2: case 3: case 5: case 10: case 25: case 50: case 0:
				$this->get('session')->set('question_count_play'.'_'.$quiz_id, $count);
				//goes further
				break;
			default:
				return $this->redirect ( $this->generateUrl ( 'start0b') );
		}
		
		//04.01.2018, astoian - emtpy ids of selected anwers for DND
		$this->get('session')->set('answer_ids_selected'.'_'.$quiz_id, array());
		
		$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));
		//28.02.2018, astoian - need to init, cos back buttton
		$this->init($quiz->getId());
		//if all questions are done, then hiscore
		$question_ids_done = $this->get('session')->get('question_ids_done'.'_'.$quiz_id);

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
			return $this->redirect ( $this->generateUrl ( 'resultb') );
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
			return $this->redirect ( $this->generateUrl ( 'resultb') );
		}


		$m=-1;
		$answers_right = $this->r('Answer')->findBy(array('parent'=>$question->getId(), 'status'=>'1'));
		if(count($answers_right)>1)$m=1;

		$qn_count=($this->get('session')->get('question_count_play'.'_'.$quiz_id)==0?count($questions):$this->get('session')->get('question_count_play'.'_'.$quiz_id));

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
			return $this->render ( 'bmode/game.question.dnd.html.twig', array (
					'quiz' => $quiz,
					'question' => $question,
					'm' => $m,
					'qncount' => $qn_count,
			) );
		}else{
			return $this->render ( 'bmode/game.question.html.twig', array (
					'quiz' => $quiz,
					'question' => $question,
					'm' => $m,
					'qncount' => $qn_count,
			) );
		}

		
	}

	/**
	 * @Route("qnext/aj", name="qnext_aj")
	 *
	 * @param Request $request
	 * @throws NotFoundHttpException
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\JsonResponse
	 */
	public function qnextAjAction(Request $request)
	{
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
		$question_count_play = $this->get('session')->get('question_count_play'.'_'.$quiz_id);

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

			//count_play
			if ($question_count_play>0){ //if 0 then all
				if($question_count_play<=(count($question_ids_done)+1)){
					$json=array("e" => 200, "hs" => 1);//no more question, cos count_play is reached
					return new JsonResponse($json);
				}
			}

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

			

			//result 
			if(count($questions)==count($question_ids_done)){
				//if repeat questions without stop
				if ($quiz->getQrepeat()==1){
					$this->get('session')->set('question_ids_done'.'_'.$quiz_id, array());
				}else{
					$json=array("e" => 200, "hs" => 1);//no more question, goto result 
					return new JsonResponse($json);
				}
			}else{
				array_push($question_ids_done,$qn->getId());
				$this->get('session')->set('question_ids_done'.'_'.$quiz_id, $question_ids_done);
			}

			$quiz_over = $this->get('session')->get('quiz_over'.'_'.$quiz_id);
			if(count($questions)==count($question_ids_done) || $quiz_over==1){
				$json=array("e" => 200, "hs" => 1);//no more question, goto result 
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

		//check if next question is multipe
		$m=-1;
		$answers_right = $this->r('Answer')->findBy(array('parent'=>$question->getId(), 'status'=>'1'));
		if(count($answers_right)>1)$m=1;

		//show animation dnd if dnd-question for the first time
		if ($question->getDnd()==1){
			if ($request->cookies->get('quiz_ani_dnd') != '1'){

				// $r = new Response();
				// $cookie = new Cookie("quiz_ani_dnd", "1", time()+86400);
				// $r->headers->setCookie($cookie);
				// $r->send();

				$content = $this->renderView ( 'default/game.ani.dnd.aj.html.twig', array (
					'question' => $qn, 
					'question_next' => $question, 
				));
				$json=array("e" => 200, "html" => $content);

				//remove question from done-list
				// $question_ids_done = array_diff($question_ids_done, array($qn->getId()));
				// $this->get('session')->set('question_ids_done'.'_'.$quiz_id, $question_ids_done);

				return new JsonResponse($json);
			}
		}

		if ($question->getDnd()==1){
			$content = $this->renderView ( 'bmode/game.question.dnd.aj.html.twig', array (
				'question' => $question,
				'quiz' => $quiz,
				'm' => $m,
		) );
		}else{
			$content = $this->renderView ( 'bmode/game.question.aj.html.twig', array (
				'question' => $question,
				'quiz' => $quiz,
				'm' => $m,
			) );
		}

		$json=array("e" => 200, "html" => $content);

		return new JsonResponse($json);
	}



	/**
	 * @Route("qselb/aj", name="qselb_aj")
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
					//if not multi-selected, then m=-1
					$json=array("e" => 200, "a" => $answer->getId(), "r"=>$answer->getId(), "s"=>$quiz_score, 'm'=>-1,'as'=>$solution);
				}

				return new JsonResponse($json);
			}else{
				// wrong answer, then the answer 0
				//$this->get('session')->set('quiz_over'.'_'.$quiz_id,1);
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
	 * @Route("qselbdnd/aj", name="qselbdnd_aj")
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
				
				//$this->get('session')->set('quiz_over'.'_'.$quiz_id,1);
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
	 * @Route("resultb", name="resultb") 
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function resultbAction(Request $request) {
		$quiz_id = $this->p('quiz_id');
		if (!isset($quiz_id)  || $quiz_id===''){
			// throw $this->createNotFoundException ( sprintf(<1t></1t>his->p('msg_default_var_not_found'),'quiz_id') );
			//return $this->redirect ( $this->generateUrl ( 'home') );
			$this->get('session')->set ( "m",  sprintf($this->p('msg_default_var_not_found'),'quiz_id'));
			return $this->render ('security/error.html.twig');
		}
		$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));

		//if count_play is defined, then goto home
		$question_count_play = $this->get('session')->get('question_count_play'.'_'.$quiz_id);
		if ($question_count_play>1){ //if 0 then all
			$question_ids_done = $this->get('session')->get('question_ids_done'.'_'.$quiz_id);
			//if not all question are answered, if the game was cancel, but not all
			if($question_count_play>(count($question_ids_done)+1)){
				return $this->redirect ( $this->generateUrl ( 'home') );
			}
		}
		//check mode of the game
		$quiz_mode = $this->get('session')->get('quiz_mode');
		if ((!isset($quiz_mode)  || $quiz_mode==='' || $quiz_mode=='a')){
			return $this->redirect ( $this->generateUrl ( 'home') );
		}
		
		$quiz_score = $this->get('session')->get('quiz_score'.'_'.$quiz_id);
		if ((!isset($quiz_score)  || $quiz_score==='' || $quiz_score==-1)){
			//throw $this->createNotFoundException ( sprintf($this->p('msg_default_var_not_found'),'quiz_score'););
			//return $this->redirect ( $this->generateUrl ( 'nodata') );
			$this->get('session')->set('quiz_score'.'_'.$quiz_id,'0');
			$quiz_score = 0;
		}
		
		//26.09.2017, astoian - Guest is already set
		// if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			// $this->setGuest();
		// }

		
		//user is anonymous
		if ($this->u()==null){
			$this->get('session')->set ( "m",  $this->p('msg_default_user_is_anonymous'));
			return $this->render ('security/error.html.twig');
			// throw $this->createNotFoundException ( $this->p('msg_default_user_is_anonymous') );
		}else{
			$question_count_play = $this->get('session')->get('question_count_play'.'_'.$quiz_id);
			if ($question_count_play>0){ //if 0 then all
				$percent = number_format($quiz_score / $question_count_play * 100, 1, ',', '.');
			}else{
				//all question by quiz-cat
				$questions = array();
				foreach ($quiz->getCats() as $c){
					if (!is_null($c->getQuestioncat()->getQuestions())) {
						//$questions = $questions + $c->getQuestioncat()->getQuestions()->toArray();
						$questions = array_merge($questions,$c->getQuestioncat()->getQuestionsActive()->toArray());
					}
				}
				$questions = array_unique($questions);
				$question_count_play = count($questions);
				$question_count_play = $this->get('session')->set('question_count_play'.'_'.$quiz_id,$question_count_play);
				$percent = number_format($quiz_score / count($questions) * 100, 1, ',','.');
			}
				
			if ($this->u()->getStatus()===9){
				return $this->render ( 'bmode/result.anonymous.html.twig', array (
						'percent'=> $percent,
						'count_play'=> $question_count_play,
						'count_score'=> $quiz_score,
						'quiz'=>$quiz,
				) );
			}else{
				return $this->render ( 'bmode/result.user.html.twig', array (
						'percent'=> $percent,
						'count_play'=> $question_count_play,
						'count_score'=> $quiz_score,
						'quiz'=>$quiz,
				) );
			}
			
		}
	}
}