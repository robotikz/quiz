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

class DefaultController extends QController {

	/**
	 * init game variables
	 *
	 * @return void
	 */
	public function init($id){
		//$this->get('session')->set('quiz_id', $id);
		$this->get('session')->set('question_ids_done'.'_'.$id, array());
		$this->get('session')->set('answer_ids_selected'.'_'.$id, array());
		$this->get('session')->set('answer_ids_multi'.'_'.$id, array());
		$this->get('session')->set('quiz_over'.'_'.$id, 0);
		$this->get('session')->set('quiz_score'.'_'.$id, -1);
		$this->get('session')->set('quiz_ads_show'.'_'.$id, 1);
		$this->get('session')->set('joker_pause'.'_'.$id, '');
		$this->get('session')->set('joker_skip'.'_'.$id, '');
		$this->get('session')->set('joker_5050'.'_'.$id, '');
		$this->get('session')->set('joker_5050_qn'.'_'.$id, '');
		$this->get('session')->set('joker_5050_a'.'_'.$id, '');
		$this->get('session')->set('quiz_score_sum_save'.'_'.$id, '');
		$this->get('session')->set('quiz_score_sum'.'_'.$id, 0);
		//$this->get('session')->set('question_count_play'.'_'.$id, 0);
	}

	/**
	 * Main-start of the Webportal
	 * @Route("/hub", name="hub")
	 * @Template("default/hub.html.twig")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function hubAction(Request $request) {

	}

	/**
	 * Main-start of the Webportal
	 * @Route("/ani", name="ani")
	 * //Template("default/ani.html.twig")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function aniAction(Request $request) {

		$r = new Response();
		$cookie = new Cookie("quiz_ani_dnd", "1", time()+86400);
		$r->headers->setCookie($cookie);
		$r->send();

		//dump($request->cookies->get('quiz_ani_dnd'));
		// return $this->render ( 'default/ani.dnd.html.twig', array () );
		return $this->render ( 'default/ani.7'.'.html.twig', array () );
	}

	/**
	 * Main-start of the Webportal
	 * @Route("/", name="home")
	 * Template("default/index.html.twig")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(Request $request) {
		
		//TODO - what Quiz need to find
		//$quiz_last = $this->r('Quiz')->findOneBy(array(),array('created' => 'DESC'));
		// $quiz_last = $this->em()->getRepository('AppBundle:Quiz')->createQueryBuilder('e')->setMaxResults( 1 )->orderBy('e.created', 'DESC')->getQuery()->getOneOrNullResult();
		$quiz_last = $this->em()->getRepository('AppBundle:Quiz')->findOneBy(array('id'=>$this->p('quiz_id')));
		$this->init($quiz_last->getId());

		if ($this->p("quiz_hub")=='1'){
			return $this->render ( 'default/hub.html.twig', array () );
		}

		$quiz_id = $this->p('quiz_id');
		// dump($this->get('session')->get('ani'.'_'.$quiz_id));
		//$this->get('logger')->info("fb_user111=".print_r($quiz_last,1));
		// dump($this->container->get('assets.packages'));//->getDefaultPackage()->getBasePath());
		// dump($this->p('img_path'));
		// dump($_GLOBAL);
		// dump($_SERVER["DOCUMENT_ROOT"]);
		// dump($this->get('kernel')->getRootDir());
		// dump($this->get('kernel')->getProjectDir());
		// dump(dirname ( __DIR__ ));
		//$this->get('logger')->info("fb_user1=111");
		//$fb_user = $this->em()->getRepository('AppBundle:User')->findOneBy(array('fid'=>'110780036214797'));
		// dump($fb_user);
// 		createQueryBuilder('u')
// 		->where('u.id = :id')
// 		->setParameter('id', '12')
// 		->getQuery()->getOneOrNullResult();
		//$this->get('logger')->info("fb_user1=".print_r($fb_user,1));
		
		//$this->get('session')->remove('guest_id');
		//return array('quiz' => $quiz_last);
		// dump($user = $this->get('security.token_storage')->getToken()->getUser());
		// dump($user = $this->get('security.token_storage')->getToken());
		if ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')
		 && $this->u()->getStatus()===9){
			$this->get('security.token_storage')->setToken(null);
			$this->get('session')->invalidate();
			$this->get('session')->set('ani'.'_'.$quiz_id, '1');
			return $this->redirect ( $this->generateUrl ( 'home') );
		}else if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			// anonymous
	        $session = $request->getSession ();
			$authenticationUtils = $this->get('security.authentication_utils');
			// get the login error if there is one
			$error = $authenticationUtils->getLastAuthenticationError();
			// last username entered by the user
			$lastUsername = $authenticationUtils->getLastUsername();
			$activate = $this->get('session')->get ( "me_acktivate_ok" );

			// $ps=$request->query->all();
			// $ps=array_keys($ps);
			// if (in_array('w', $ps)){
			// 	return $this->render ( 'default/ani.html.twig', array () );
			// }
			//$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));
			
			//15.01.2019, astoian - get question for start page
			$qn_start = $this->p('qn_start');
			$qn_ids = explode(',', $qn_start);
			$questions = [];
			foreach ($qn_ids as $qn_id){
				$qn = $this->r('Question')->findOneBy(array('id'=>$qn_id));
				if ($qn){
					$qn->m=-1;
					$answers_right = $this->r('Answer')->findBy(array('parent'=>$qn->getId(), 'status'=>'1'));
					if(count($answers_right)>1)$qn->m=1;
					array_push($questions, $qn);
				}
				
			}
			$ani = $this->get('session')->get('ani'.'_'.$quiz_id);
			if ($ani==null  || $ani==''){
				$this->get('session')->set('ani'.'_'.$quiz_id, '1');
				return $this->render ( 'default/ani.'.$quiz_id.'.html.twig', array ('questions'=>$questions) );
			}
			//03.12.2018, astoian - always show animation
			return $this->render ( 'default/ani.'.$quiz_id.'.html.twig', array ('questions'=>$questions) );
			// return $this->render ( 'security/login0.html.twig', array (
			// 		'last_username' => $lastUsername,
			// 		'error' => $error,
			// 		'activate' => $activate,
			// ) );
	    }else{
			//flag to start the quiz from start, but by refresh blocks it
			$this->get('session')->set('quiz', '');
			//  authenticated (NON anonymous)
			//return $this->redirect ( $this->generateUrl ( 'qfirsta') );
			return $this->render ( 'default/index.html.twig', array (
			) );
		}
	}

	/**
	 * @Route("start1", name="start1")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function start1Action(Request $request) {
		if ($this->p("quiz_hub")=='1'){
			return $this->render ( 'default/hub.html.twig', array () );
		}
		if ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			//flag to start the quiz from start, but by refresh blocks it
			$this->get('session')->set('quiz', '');
			//  authenticated (NON anonymous)
			return $this->render ( 'default/index.html.twig', array () );
			//return $this->redirect ( $this->generateUrl ( 'qfirsta') );
			// return $this->redirect ( $this->generateUrl ( 'home') );
		}else{
			//here goes the logic
			$quiz_id = $this->p('quiz_id');
			if ($quiz_id==null  || $quiz_id==''){
				return $this->redirect ( $this->generateUrl ( 'home') );
			}
			$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));
			if($quiz->getGuestallow()==1){
				$this->setGuest(null,$request);
				// dump($user = $this->get('security.token_storage')->getToken()->getUser());
				// dump($user = $this->get('security.token_storage'));
				return $this->render ( 'default/index.html.twig', array () );
				//return $this->redirect ( $this->generateUrl ( 'qfirsta') );
			}else{
				//cos guest is off
				return $this->redirect ( $this->generateUrl ( 'home') );
			}
			

		}
	}

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
	// 		$activate = $this->get('session')->get ( "me_acktivate_ok" );
	// 		return $this->render ( 'security/login0.html.twig', array (
	// 				'last_username' => $lastUsername,
	// 				'error' => $error,
	// 				'activate' => $activate,
	// 		) );
	// 	}
	// }

	

	
	

	/**
	 * @Route("joker5050/aj", name="joker_5050_aj")
	 *
	 * @param Request $request
	 * @throws NotFoundHttpException
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\JsonResponse
	 */
	public function joker5050AjAction(Request $request)
	{
		//*************RIGHTS************************************
		$json=array("e" => 400, "a" => -1);
		//*************RIGHTS************************************

		if (! $request->isXmlHttpRequest()) {
			return new JsonResponse($json);
		}
		$quiz_id = $request->query->get('qz');
		$question_id = $request->query->get('qn');
		$quiz_id = $this->p('quiz_id');
		if ($quiz_id==null  || $quiz_id==''){
			//throw $this->createNotFoundException ( 'Quiz is not found, id='. $quiz_id );
			return new JsonResponse($json);
		}
		$question = $this->em()->getRepository('AppBundle:Question')->find($question_id);
		if ($question==null){
			//throw $this->createNotFoundException ( 'Question is not found, id='. $question_id );
			return new JsonResponse($json);
		}

		//get already corrected answered
		$answer_ids_multi = $this->get('session')->get('answer_ids_multi'.'_'.$quiz_id);
		if(!$answer_ids_multi)	$answer_ids_multi=array();

		$as = $question->getAnswers()->toArray();
		$as_random_count = 1; // (count($as)/2)-1;//get the count of incorrect answers to get it as ramdom
		$as5050 = array();
		//find correct answer and remove from array, to get incorrect as random
		foreach ($as as $k => $a){
			if($a->getStatus()==1){
				//check if already answered correctly, then skip it
				if (!in_array($a->getId(), $answer_ids_multi)) {//if answer_id is NOT in $answer_ids_multi
					array_push($as5050, $a);
				}
				unset($as[$k]);
				//break;
			}
		}
		//get random incorrect answers, only one
		$as_rand = Ses::array_random($as, $as_random_count);
		//get random correct answers, only one
		$as5050 = Ses::array_random($as5050, $as_random_count);
		//as5050 - has only one corret answer
		$answer_correct = reset($as5050); // First Element's Value
		//merge right answers + random incorrent answers
		$as5050 = array_merge($as5050, $as_rand);
		$as5050_ids = array();
		foreach ($as5050 as $a){
			array_push($as5050_ids, $a->getId());
		}

		$joker_5050 = $this->get('session')->get('joker_5050'.'_'.$quiz_id);
		if ($joker_5050==null  || $joker_5050==''){
			$this->get('session')->set('joker_5050'.'_'.$quiz_id,$quiz_id);
			$this->get('session')->set('joker_5050_qn'.'_'.$quiz_id,$question_id);
			$this->get('session')->set('joker_5050_a'.'_'.$quiz_id,$answer_correct->getId());
			$json=array("jcode" => 200, "a" => $as5050_ids,'as_random_count'=>$as_random_count);
			return new JsonResponse($json);
		}else{
			//s$json=array("jcode" => 400, "jerr" => 'disabled',"html" => '');
			return new JsonResponse($json);
		}
		//here goes the logic

	}



	
	
	

	/**
	 * @Route("info/rules", name="info_rules")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function infoRulesAction(Request $request) {
		//here goes the logic
		$quiz = $this->ql();
		$tdb = $this->em()->getRepository('AppBundle:InfoHolder')->findOneBy(array('tn'=>'info.rules','quiz'=>$this->p('quiz_id')));
		if (is_null($tdb)){
			$tdb = $this->em()->getRepository('AppBundle:InfoHolder')->findOneBy(array('tn'=>'info.rules'));
		}
		// dump($tdb);
		$template = $this->get('twig')->createTemplate($tdb->getVal()); 
		return new Response($template->render( array (
			'quiz'=>$quiz
		) ));
	}

	/**
	 * @Route("info/imprint", name="info_imprint")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function infoImprintAction(Request $request) {
		$quiz = $this->ql();
		$tdb = $this->em()->getRepository('AppBundle:InfoHolder')->findOneBy(array('tn'=>'info.imprint','quiz'=>$this->p('quiz_id')));
		if (is_null($tdb)){
			$tdb = $this->em()->getRepository('AppBundle:InfoHolder')->findOneBy(array('tn'=>'info.imprint'));
		}
		$template = $this->get('twig')->createTemplate($tdb->getVal()); 
		return new Response($template->render( array (
			'quiz'=>$quiz
		) ));
		// return $this->render ( 'global/info.imprint.html.twig', array (
		// ) );
	}

	/**
	 * @Route("info/dataprotection", name="info_dataprotection")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function infoDataprotectionAction(Request $request) {
		$quiz = $this->ql();
		$tdb = $this->em()->getRepository('AppBundle:InfoHolder')->findOneBy(array('tn'=>'info.dataprotection','quiz'=>$this->p('quiz_id')));
		if (is_null($tdb)){
			$tdb = $this->em()->getRepository('AppBundle:InfoHolder')->findOneBy(array('tn'=>'info.dataprotection'));
		}
		$template = $this->get('twig')->createTemplate($tdb->getVal()); 
		return new Response($template->render( array (
			'quiz'=>$quiz
		) ));
		// return $this->render ( 'global/info.dataprotection.html.twig', array (
		// ) );
	}

	/**
	 * @Route("info/contact", name="info_contact")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function infoContactAction(Request $request) {
		//here goes the logic
		$quiz = $this->ql();
		$tdb = $this->em()->getRepository('AppBundle:InfoHolder')->findOneBy(array('tn'=>'info.contact','quiz'=>$this->p('quiz_id')));
		if (is_null($tdb)){
			$tdb = $this->em()->getRepository('AppBundle:InfoHolder')->findOneBy(array('tn'=>'info.contact'));
		}
		$template = $this->get('twig')->createTemplate($tdb->getVal()); 
		return new Response($template->render( array (
			'quiz'=>$quiz
		) ));
		// return $this->render ( 'global/info.contact.html.twig', array (
		// 	'quiz'=>$quiz
		// ) );
	}

	/**
	 * @Route("info/contact/aj", name="info_contact_aj")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function infoContactAjAction(Request $request) {
		//*************RIGHTS************************************
		// if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
		// 	$json=array("e" => 201, "html" => "User is not logged in");
		// 	return new JsonResponse($json);
		// }
		// if ($this->u()->getStatus()===9){
		// 	$json=array("e" => 201, "html" => "Guest-User is not allowed");
		// 	return new JsonResponse($json);
		// }
		//*************RIGHTS************************************
		if (! $request->isXmlHttpRequest()) {
			$json=array("e" => 202, "html" => "Request is not a XmlHttpRequest");
			return new JsonResponse($json);
		}
		if ($request->isMethod('POST')) {
			//reCapthca
			//var_dump($request->get('g-recaptcha-response'));
			$gr = $this->grecaptcha($request->get('g-recaptcha-response'));
			if (!isset($gr["success"]) || $gr["success"]==false){
				if (isset($gr["exception"])){
					$json=array("e" => 211, "html" => $this->p('e_g_recaptcha')." - ".$gr["error-codes"]);
				}else{
					$json=array("e" => 210, "html" => $this->p('e_g_recaptcha'));
				}
				return new JsonResponse($json);
			}
			$data = $request->request->all();
			// $o = $request->request->get('op1');
			// dump($data);
			if ($this->u()==null){
				$data['user']="Anonymous";
			}else{
				$data['user']=$this->u()->getUsername();
			}
			
			// dump($data);
			// return new JsonResponse($data);
			if ($this->p("notify_off")=="1"){
				//TODO - Log it for admins
				$json=array("e" => 209, "html" => $this->p('msg_security_mail_deactivated'));
				return new JsonResponse($json);
			}else{
				$nm = $this->get('app.notify.manager');
				// $subj = $this->r('PlaceHolder')->findOneBy(array('ph'=>'[#mail_subj_info_contact#]'));
				if (!$nm->send(array(
						'quiz_id'=>$this->p('quiz_id'),
						'to'=>$this->p('mail_to_support'),
						'from'=>$data['email'],
						's'=>'[#mail_subj_info_contact#]',
						'bn'=>'info.contact',
						'bo'=>array('data' => $data)//,'quiz'=>$quiz - in Twig-Globals
				))){
					$json=array("e" => 290, "html" => "Mail is not sent");
					return new JsonResponse($json);
				}
			}
			$json=array("e" => 200, "html" => "ok");
			return new JsonResponse($json);
		}
		$json=array("e" => 202, "html" => "Nothing is posted");
		return new JsonResponse($json);
	}

	/**
	 * post data via dialog and send a mail
	 * @Route("dlg/question/comment/aj", name="dlg_question_comment_aj")
	 */
	public function dlgQuestionCommentAjAction(Request $request) {
		//*************RIGHTS************************************
		if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			$json=array("e" => 201, "html" => "User is not logged in");
			return new JsonResponse($json);
		}
		//*************RIGHTS************************************
		if (! $request->isXmlHttpRequest()) {
			$json=array("e" => 202, "html" => "Request is not a XmlHttpRequest");
			return new JsonResponse($json);
		}
		if ($request->isMethod('POST')) {
			$data = $request->request->all();
			
			// $o = $request->request->get('op1');
			//dump($data['opt1']);
			for ($i = 1; $i <= 5; $i++) {
    			if (!array_key_exists('opt'.$i, $data)) {
					$data['opt'.$i]="";
				}
			}
			//dump($data);
			// return new JsonResponse($data);
			if ($this->p("notify_off")=="1"){
				//TODO - Log it for admins
			}else{
				$nm = $this->get('app.notify.manager');
				// $subj = $this->r('PlaceHolder')->findOneBy(array('ph'=>'[#mail_subj_question_comment#]'));
				if (!$nm->send(array(
						'quiz_id'=>$this->p('quiz_id'),
						'to'=>$this->p('mail_to_support'),
						'from'=>$this->u()->getEmail(),
						's'=>'[#mail_subj_question_comment#]',
						'bn'=>'question.comment',
						'bo'=>array('data' => $data)//,'quiz'=>$quiz - in Twig-Globals
				))){
					$json=array("e" => 290, "html" => "Mail is not sent");
					return new JsonResponse($json);
				}
			}
			$json=array("e" => 200, "html" => "ok");
			return new JsonResponse($json);
		}
		$json=array("e" => 200, "html" => "ok");
		return new JsonResponse($json);
	}

	/**
	 * post data via dialog and send a mail
	 * @Route("dlg/question/new/aj", name="dlg_question_new_aj")
	 */
	public function dlgQuestionNewAjAction(Request $request) {
		//*************RIGHTS************************************
		if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			$json=array("e" => 201, "html" => "User is not logged in");
			return new JsonResponse($json);
		}
		if ($this->u()->getStatus()===9){
			$json=array("e" => 201, "html" => "Guest-User is not allowed");
			return new JsonResponse($json);
		}
		//*************RIGHTS************************************
		// if (! $request->isXmlHttpRequest()) {
		// 	$json=array("e" => 202, "html" => "Request is not a XmlHttpRequest");
		// 	return new JsonResponse($json);
		// }
		if ($request->isMethod('POST')) {
			$data = $request->request->all();
			// $o = $request->request->get('op1');
			// dump($data);
			if (!array_key_exists('answern', $data)) {
				$data['answern']="";
			}
			$data['user']=$this->u()->getUsername();

			// dump($data);
			// return new JsonResponse($data);
			if ($this->p("notify_off")=="1"){
				//TODO - Log it for admins
			}else{
				$nm = $this->get('app.notify.manager');
				// $subj = $this->r('PlaceHolder')->findOneBy(array('ph'=>'[#mail_subj_question_new#]'));
				if (!$nm->send(array(
						'quiz_id'=>$this->p('quiz_id'),
						'to'=>$this->p('mail_to_support'),
						'from'=>$this->u()->getEmail(),
						's'=>'[#mail_subj_question_new#]',
						'bn'=>'question.new',
						'bo'=>array('data' => $data)//,'quiz'=>$quiz - in Twig-Globals
				))){
					$json=array("e" => 290, "html" => "Mail is not sent");
					return new JsonResponse($json);
				}
			}
			$json=array("e" => 200, "html" => "ok");
			return new JsonResponse($json);
		}
		$json=array("e" => 200, "html" => "ok");
		return new JsonResponse($json);
	}

	/**
	 * post data via dialog and send a mail
	 * @Route("dlg/quiz/feedback/aj", name="dlg_quiz_feedback_aj")
	 */
	public function dlgQuizFeedbackAjAction(Request $request) {
		//*************RIGHTS************************************
		if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			$json=array("e" => 201, "html" => "User is not logged in");
			return new JsonResponse($json);
		}
		//*************RIGHTS************************************
		if (! $request->isXmlHttpRequest()) {
			$json=array("e" => 202, "html" => "Request is not a XmlHttpRequest");
			return new JsonResponse($json);
		}
		if ($request->isMethod('POST')) {
			$data = $request->request->all();
			
			// $o = $request->request->get('op1');
			if (!array_key_exists('q1opt', $data)) {
				$json=array("e" => 290, "html" => $this->p('dlg_quiz_feedback_q1'));
				return new JsonResponse($json);
			}
			if (!array_key_exists('q2opt', $data)) {
				$json=array("e" => 290, "html" => $this->p('dlg_quiz_feedback_q2'));
				return new JsonResponse($json);
			}
			

			$quiz = $this->ql();
			$data['quiz']=$quiz->getTitle();
			if ($this->u()==null){
				$data['user']="Anonymous";
			}else{
				$data['user']=$this->u()->getUsername();
			}	
			
			if ($this->u()==null){
				$data['email']="Anonymous";
			}else{
				$data['email']=$this->u()->getEmail();
			}	
			//dump($data);
			// return new JsonResponse($data);
			if ($this->p("notify_off")=="1"){
				//TODO - Log it for admins
			}else{
				$nm = $this->get('app.notify.manager');
				if (!$nm->send(array(
						'quiz_id'=>$this->p('quiz_id'),
						'to'=>$this->p('mail_to_support'),
						'from'=>$data['email'],
						's'=>'[#mail_subj_quiz_feedback#]',
						'bn'=>'quiz.feedback',
						'bo'=>array('data' => $data)//,'quiz'=>$quiz - in Twig-Globals
				))){
					$json=array("e" => 290, "html" => "Mail is not sent");
					return new JsonResponse($json);
				}
			}
			if (!is_null($this->u())){
				if ($this->u()->getStatus()===9){
					//nothing
				}else{
					//save for user, then no feedback anymore
					$this->u()->setTel3('1');
					$this->em()->flush();
				}
			}	
			$json=array("e" => 200, "html" => "ok");
			return new JsonResponse($json);
		}
		$json=array("e" => 200, "html" => "ok");
		return new JsonResponse($json);
	}


	/**
	 * load html for Animation-DND
	 * 
	 * @Route("ani/dnd/aj", name="ani_dnd_aj")
	 */
	public function aniDndAjAction(Request $request) {

		if (! $request->isXmlHttpRequest()) {
			throw new NotFoundHttpException();
		}

		$content = $this->renderView ( 'global/dlg.ani.html.twig', array (
		) );
		
		$json=array("e" => 200, "html" => $content);

		return new JsonResponse($json);
	}

	/**
	 * let session variable via ajax
	 * 
	 * @Route("sss/aj", name="sss_aj")
	 */
	public function sssAjAction(Request $request) {

		//*************RIGHTS************************************
		$json=array("e" => 400, "html" => "session error");
		//*************RIGHTS************************************
		if (! $request->isXmlHttpRequest()) {
			return new JsonResponse($json);
		}

		$s = $request->query->get('s');
		if ($s==null  || $s==''){
			$json=array("e" => 400, "html" => "session name is empty");
			return new JsonResponse($json);
		}

		$v = $request->query->get('v');
		if ($s==null){
			$json=array("e" => 400, "html" => "session name is null");
			return new JsonResponse($json);
		}

		$this->get('session')->set($s,$v);
		
		$json=array("e" => 200, "html" => 'session ok');

		return new JsonResponse($json);
	}


	/**
	 * @Route("qselstart/aj", name="qselstart_aj")
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


}
