<?php
// src/AppBundle/Controller/AdminController.php

namespace AppBundle\Controller;

use AppBundle\Entity\Answer;
use AppBundle\Entity\Question;
use AppBundle\Entity\QuestionCat;
use AppBundle\Entity\QuestionTag;
use AppBundle\Entity\Quiz;
use AppBundle\Entity\QuizCat;
use AppBundle\Entity\User;
use AppBundle\Entity\UserRole;
use AppBundle\Form\QuestionCatType;
use AppBundle\Form\QuestionTagType;
use AppBundle\Form\QuestionType;
use AppBundle\Form\QuizType;
use AppBundle\Form\UserEType;
use AppBundle\Form\UserRoleType;
use AppBundle\Form\UserType;
use AppBundle\Utils\Ses;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use AppBundle\Form\QuizQuestionType;
use Doctrine\Common\Collections\ArrayCollection;
use AppBundle\Utils\PaginationHelper;

class AdminController extends QController {

	/**
	 * @Route("admin/", name="admin")
	 * Security("has_role('ROLE_ADMIN')")
	 * yes
	 */
	public function indexAction(Request $request) {
		if (!$this->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
			$this->get('session')->set ( "m",  "Nur für Admin");
			return $this->render ('security/error.html.twig');
		}
		//+++++++++++++++++++++++ @Security ADMINS ONLY++++++++++++++++++++++++++++++++++
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
		// foreach ($quizs as $quiz){
		// 	$questions = array();
		// 	foreach ($quiz->getCats() as $c){
		// 		if (!is_null($c->getQuestioncat()) && !is_null($c->getQuestioncat()->getQuestions())) {
		// 			$questions = $questions + $c->getQuestioncat()->getQuestions()->toArray();
		// 		}
		// 	}
		// 	$quiz->setQcount(count($questions));
		// }
		return $this->render ( 'admin/quiz.html.twig', array (
				'quizs' => $quizs,
		) );
		//changes 08.01.17
// 		return $this->render ( 'admin/index.html.twig', array (
// 				'y' => 'y'
// 		) );
	}

	/**
	 * @Route("uuu", name="admin_uuu")
	 * @Method({"GET"})
	 * @Template("admin/uuu.html.twig")
	 * TODO -block it by production server
	 */
	public function uuuAction(Request $request) {
		//+++++++++++++++++++++++ @Security ADMINS ONLY++++++++++++++++++++++++++++++++++
		$uuu=$this->r()->findAll();
		return array('uuu' => $uuu);
	}





	/**
	 * @Security("has_role('ROLE_ADMIN')")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function globalAction(Request $request) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++


		//$city = $this->em()->getRepository('AppBundle:City')->find($ciid);

		$dd = array('1' => 'What');
		$form = $this->createFormBuilder($dd)
		->add('id', 'hidden', array(
				'data' => '1',
		))
		->add('notify_off', 'text', array(
				'data' => $this->p('notify_off'),
		))
		->add('notify_use', 'text', array(
				'data' => $this->p('notify_use'),
		))
		->getForm();

		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//------------------edit notify_off
				$notify_off = $form->get('notify_off')->getData();
				if (!is_null($notify_off) & $notify_off!=""){
					$this->p('notify_off',$notify_off);
					$this->get('session')->set('admin_notify_off_ok', 'notify_off is OK');
				}else{
					$this->get('session')->set('admin_notify_off_ok', $this->p('msg_admin_nothing_edited'));
				}
				//------------------edit notify_use
				$notify_use = $form->get('notify_use')->getData();
				if (!is_null($notify_use) & $notify_use!=""){
					$this->p('notify_use',$notify_use);
					$this->get('session')->set('admin_notify_use_ok', 'notify_use is OK');
				}else{
					$this->get('session')->set('admin_notify_use_ok', $this->p('msg_admin_nothing_edited'));
				}
				return $this->redirect ( $this->generateUrl ( 'admin_global') );
				//$citys = $this->em()->getRepository('AppBundle:City')->getCitysByCountry($coid);
			}
		}

		return $this->render ( 'AppBundle:Admin:global.html.twig', array (
				'dd' => $dd,
				'form'=>$form->createView()
		) );
	}




	/**
	 * @Route("admin/userrole", name="admin_userrole")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function userroleAction(Request $request) {
		//*************RIGHTS************************************

		$userroles = $this->em()->getRepository('AppBundle:UserRole')->findBy(array('status'=>'1'), array('role' => 'ASC'));

		return $this->render ( 'admin/user.role.html.twig', array (
				'userroles' => $userroles,
		) );
	}


	/**
	 * @Route("admin/userrolene/{eid}", name="admin_userrole_ne")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function userroleneAction(Request $request,$eid=null) {
		//*************RIGHTS************************************

		if ($eid==null || $eid==0){
			$userrole = new UserRole();
		}else{
			$userrole = $this->em()->getRepository('AppBundle:UserRole')->find($eid);
		}
		if ($userrole==null) $userrole = new UserRole();

		$form = $this->createForm ( UserRoleType::class, $userrole );
		$form2 = clone $form;

		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//var_dump($p);
				$this->em()->persist ( $userrole );
				$this->em()->flush ();
				$this->get('session')->set('admin_userrole_ok', 'UserRole is OK');
				$userrole = $this->em()->getRepository('AppBundle:UserRole')->find($eid);
				$form = $form2;//disable a message for resend data by page-refresh
			}else{
				$this->get('session')->set('admin_userrole_ok', 'Nothing is created');
			}
		}

		return $this->render ( 'admin/user.role.ne.html.twig', array (
				'userrole' => $userrole,
				'form'=>$form->createView()
		) );
	}




	/**
	 * @Route("admin/user", name="admin_user")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function userAction(Request $request) {
		//*************RIGHTS************************************

		$users = $this->em()->getRepository('AppBundle:User')->findBy(array(), array('username' => 'ASC'));

		return $this->render ( 'admin/user.html.twig', array (
				'users' => $users,
		) );
	}


	/**
	 * @Route("admin/userne/{eid}", name="admin_user_ne")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function userneAction(Request $request,$eid=null) {
		//*************RIGHTS************************************

		if ($eid==null || $eid==0){
			$user = new User();
		}else{
			$user = $this->em()->getRepository('AppBundle:User')->find($eid);
		}
		if ($user==null || !$user->getId()) {
			$user = new User();
			$form = $this->createForm ( UserType::class, $user );
		}else{
			$form = $this->createForm ( UserEType::class, $user );
		}


		//$form2 = clone $form;

		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {

				$p = $request->get ( 'user' );
				//var_dump($p);
				// crop & resize the avatar image
				if ($p ['avatar_x'] != null && $p ['avatar_x'] != '') {
					if (!Ses::imgCrop (
							Ses::getUpDirTmp($this->p('img_path'), $user->getUsername() ) . "/" . $p ['avatar'],
							$p ['avatar_x'],
							$p ['avatar_y'],
							$p ['avatar_w'],
							$p ['avatar_h'] )) {
								$this->get('session')->set ( "admin_user_ok", 'The Image-Crop-Function return false, check logs' );
							}

					$img_constraint = array (
							'constraint' => array (
									'width' => 100,
									'height' => 100
							)
					);
					$avatar=Ses::after('tmp_', $p ['avatar']);
					//dump($avatar);
					Ses::imgResize ( Ses::getUpDirTmp($this->p('img_path'),$user->getUsername()) . "/" . $p ['avatar'], Ses::getUpDirTmp($this->p('img_path'),$user->getUsername()) . "/" . $avatar, $img_constraint );
					$user->setAvatar($avatar);
				}

				//special case for super admins
				if($user->getUsername()=="admin" || $user->getUsername()=="support" || $user->getUsername()=="service"){
					//$user->addUserRole('ROLE_ADMIN');
					//$ur = $this->r('UserRole')->findOneBy(array('role'=>'ROLE_SUPER'));
					$ur = $this->r('UserRole')->findOneBy(array('role'=>'ROLE_SUPER'));
					$user->addUserRole($ur);
				}

				$this->em()->persist ( $user );
				$this->em()->flush ();
				$this->get('session')->set('admin_user_ok', 'User is OK');
				//$user = $this->em()->getRepository('AppBundle:User')->find($user->getId());
				//$form = $form2;//disable a message for resend data by page-refresh
				return $this->redirect ( $this->generateUrl ( 'admin_user',array(
						'_'=>'y'
				)) );
			}else{
				$this->get('session')->set('admin_user_ok', 'Nothing is created');
			}
		}

		return $this->render ( 'admin/user.ne.html.twig', array (
				'user' => $user,
				'form'=>$form->createView()
		) );
	}

	/**
	 * @Route("admin/useroff/{eid}", name="admin_user_off", requirements={"eid": "\d+"})
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function useroffAction(Request $request, $eid=null) {
		//*************RIGHTS************************************

		if ($eid==null || $eid==0){
			$this->get('session')->set('admin_user_ok', 'Nothing is deleted');
		}else{
			$user = $this->em()->getRepository('AppBundle:User')->find($eid);
		}
		if ($user==null) {
			$this->get('session')->set('admin_user_ok', 'Nothing is deleted');
		}else{
			$user->setStatus(0);
			$this->em()->persist($user);
			$this->em()->flush ();
			$this->get('session')->set('admin_user_ok', 'User deactivation is OK');
		}

		return $this->redirect ( $this->generateUrl ( 'admin_user') );
	}

	/**
	 * @Route("admin/useron/{eid}", name="admin_user_on", requirements={"eid": "\d+"})
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function useronAction(Request $request, $eid=null) {
		//*************RIGHTS************************************

		if ($eid==null || $eid==0){
			$this->get('session')->set('admin_user_ok', 'Nothing is deleted');
		}else{
			$user = $this->em()->getRepository('AppBundle:User')->find($eid);
		}
		if ($user==null) {
			$this->get('session')->set('admin_user_ok', 'Nothing is deleted');
		}else{
			$user->setStatus(1);
			$this->em()->persist($user);
			$this->em()->flush ();
			$this->get('session')->set('admin_user_ok', 'User activation is OK');
		}

		return $this->redirect ( $this->generateUrl ( 'admin_user') );
	}
	
	/**
	 * @Route("admin/user/_/aj", name="admin_user_aj")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function userAjAction(Request $request) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		//*************RIGHTS************************************
		if (!$this->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
			throw $this->createAccessDeniedException();
		}
		//*************RIGHTS************************************
	
		if (! $request->isXmlHttpRequest()) {
			throw new NotFoundHttpException();
		}
	
		$id = $request->query->get('id');//in reality many IDs
		$act = $request->query->get('act');
		//init current user
		$ids = explode(',', $id);
		foreach ($ids as $idi){
			//dump($idi);
			$qcat = $this->em()->getRepository('AppBundle:User')->find($idi);
			if (!$qcat) {
				//throw $this->createNotFoundException ( 'user is not found, id='. $idi );
				$json=array("e" => 400, "html" => 'User is not found, id='. $idi);
				return new JsonResponse($json);
			}
			if ($act=="st1"){
				$qcat->setStatus(1);
				$this->em()->persist($qcat);
			}else if ($act=="st0"){
				$qcat->setStatus(0);
				$this->em()->persist($qcat);
			}if ($act=="del"){
				//$this->em()->remove($qcat);
			}
		}
		$this->em()->flush();
	
		$users = $this->em()->getRepository('AppBundle:User')->findAll();
		$content = $this->
		renderView ( 'admin/user.table.html.twig', array (
				'users' => $users,
		) );
		$json=array("e" => 200, "html" => $content);
	
		return new JsonResponse($json);
	
	}

	/**
	 *	userAvatarAction
	 * @Route("aj/user/avatar", name="aj_user_avatar")
	 *
	 * @param
	 *
	 */
	public function userAvatarAction(Request $request) {
		$ret1 = null;
		if (is_object(parent::upFotoAction1($ret1))) return $ret1;

		//TODO check username if already exist, then return validation-message, check only by new users

		$fd = $request->files->get('user');
		//$un = $request->get('user_username');
		$un = $request->get('user_unid');
		$ffoto = $fd['avatar_f'];//$request->files->get('user[avatar_f]', array(), true);
		//var_dump($request->files->all());
		//$ix = $blog->getFotos()->count()+1;
		$typ="admin_avatar";
		$img_min_w = 100;
		$img_min_h = 100;
		//$img_max_w = 400;
		//$img_max_h = 400;
		$img_p_big = array(	'constraint' => array('width' => 200, 'height' => 200));
		$img_p_sm = array(	'constraint' => array('width' => 100, 'height' => 100));

		return new JsonResponse(
				parent::upFotoAction2(1,1,$ffoto,$typ,$img_min_w,$img_min_h,$img_p_sm,$img_p_big,$un),//,$img_max_w,$img_max_h),
				200,
				array('Content-Type'=>'application/json')
		);

	}


	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


	/**
	 * @Route("admin/questioncat", name="admin_question_cat")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questioncatAction(Request $request) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		$questioncats = $this->em()->getRepository('AppBundle:QuestionCat')->getQuestionCatsAll();

		return $this->render ( 'admin/question.cat.html.twig', array (
				'questioncats' => $questioncats,
		) );
	}

	/**
	 * @Route("admin/questioncat/{eid}", name="admin_question_cat_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questioncatneAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		$title_old = '';
		if ($eid==null || $eid==0){
			$questioncat = new QuestionCat();
		}else{
			$questioncat = $this->em()->getRepository('AppBundle:QuestionCat')->find($eid);
			$title_old = $questioncat->getTitle();
		}
		if ($questioncat==null) $questioncat = new QuestionCat();


		$form = $this->createForm ( QuestionCatType::class, $questioncat );
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//------------------edit questioncat
				if ($questioncat->getQuizcat()==null){
					$quizcat = $this->em()->getRepository('AppBundle:QuizCat')->getQuizCatByCat(strtolower($title_old));
					//dump($quizcat);
					if (true === is_null ($quizcat)){
						$quizcat = new QuizCat();
						$quizcat->setTitle($questioncat->getTitle());
						$quizcat->setQuestioncat($questioncat);
						$questioncat->setQuizcat($quizcat);
						$this->em()->persist ( $quizcat );
					}else{
						$questioncat->setQuizcat($quizcat);
						$quizcat->setQuestioncat($questioncat);
					}
				}else{
					$questioncat->getQuizcat()->setTitle($questioncat->getTitle());
					$questioncat->getQuizcat()->setQuestioncat($questioncat);
				}
				$this->em()->persist ( $questioncat );
				$this->em()->flush();
				$this->get('session')->set('admin_questioncate_ok', 'QuestionCat+QuizCat is OK');
				if ($form->get('save_add')->isClicked()) {
					return $this->redirect($this->generateUrl('admin_question_ne',array('eid'=>'+')));
				}
				return $this->redirect ( $this->generateUrl ( 'admin_question_cat') );
				//$questioncats = $this->em()->getRepository('AppBundle:QuestionCat')->getQuestionCatsByCountry($coid);
			}
		}

		return $this->render ( 'admin/question.cat.ne.html.twig', array (
				'questioncat' => $questioncat,
				'form'=>$form->createView(),
		) );
	}

	/**
	 * @Route("admin/questioncat/-/{eid}", name="admin_question_cat_d", requirements={"eid": "\d+"})
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questioncatdAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		if ($eid==null || $eid==0){
			$this->get('session')->set('admin_question_cat_ok', 'Nothing is deleted');
		}else{
			$questioncat = $this->em()->getRepository('AppBundle:QuestionCat')->find($eid);
		}
		if ($questioncat==null) {
			$this->get('session')->set('admin_question_cat_ok', 'Nothing is deleted');
		}else{
			$quizcat = $questioncat->getQuizcat();
			$questioncat->setQuizcat(null);
			$quizcat->setQuestioncat(null);
			$this->em()->flush ();
			$this->em()->remove($questioncat);
			$this->em()->remove($quizcat);
			$this->em()->flush ();
			$this->get('session')->set('admin_question_cat_ok', 'Question-Cat deletion is OK');
		}

		return $this->redirect ( $this->generateUrl ( 'admin_question_cat'));

	}
	
	
	/**
	 * @Route("admin/questioncat/_/aj", name="admin_question_cat_aj")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questioncatAjAction(Request $request) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		//*************RIGHTS************************************
		if (!$this->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
			throw $this->createAccessDeniedException();
		}
		//*************RIGHTS************************************
		
		if (! $request->isXmlHttpRequest()) {
			throw new NotFoundHttpException();
		}
		
		$id = $request->query->get('id');//in reality many IDs
		$act = $request->query->get('act');
		//init current user
		$ids = explode(',', $id);
		foreach ($ids as $idi){
			//dump($idi);
			$qcat = $this->em()->getRepository('AppBundle:QuestionCat')->find($idi);
			if (!$qcat) {
				//throw $this->createNotFoundException ( 'QuestionCat is not found, id='. $idi );
				$json=array("e" => 400, "html" => 'QuestionCat is not found, id='. $idi);
				return new JsonResponse($json);
			}
			if ($act=="st1"){
				$qcat->setStatus(1);
				$this->em()->persist($qcat);
			}else if ($act=="st0"){
				$qcat->setStatus(0);
				$this->em()->persist($qcat);
			}if ($act=="del"){
				$this->em()->remove($qcat);
			}
		}
		$this->em()->flush();
		
		$questioncats = $this->em()->getRepository('AppBundle:QuestionCat')->getQuestionCatsAll();
		$content = $this->
			renderView ( 'admin/question.cat.table.html.twig', array (
					'questioncats' => $questioncats,
			) );
		$json=array("e" => 200, "html" => $content);
		
		return new JsonResponse($json);
		
	}



	/**
	 * @Route("admin/questiontag", name="admin_question_tag")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questiontagAction(Request $request) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		$questiontags = $this->em()->getRepository('AppBundle:QuestionTag')->getQuestionTagsAll();
		//$questiontags = array();

		return $this->render ( 'admin/question.tag.html.twig', array (
				'questiontags' => $questiontags,
		) );
	}

	/**
	 * @Route("admin/questiontag/{eid}", name="admin_question_tag_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questiontagneAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		if ($eid==null || $eid==0){
			$questiontag = new QuestionTag();
		}else{
			$questiontag = $this->em()->getRepository('AppBundle:QuestionTag')->find($eid);
		}
		if ($questiontag==null) $questiontag = new QuestionTag();

		$form = $this->createForm ( QuestionTagType::class, $questiontag );
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//------------------edit questiontag
				//dump($questiontag);
				$this->em()->persist ( $questiontag );
				$this->em()->flush ();
				$this->get('session')->set('admin_question_tag_ok', 'QuestionTag is OK');
				return $this->redirect ( $this->generateUrl ( 'admin_question_tag') );
				//$questiontags = $this->em()->getRepository('AppBundle:QuestionTag')->getQuestionTagsByCountry($coid);
			}
		}

		return $this->render ( 'admin/question.tag.ne.html.twig', array (
				'questiontag' => $questiontag,
				'form'=>$form->createView()
		) );
	}


	/**
	 * @Route("admin/questiontag/-/{eid}", name="admin_question_tag_d", requirements={"eid": "\d+"})
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questiontagdAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		if ($eid==null || $eid==0){
			$this->get('session')->set('admin_question_tag_ok', 'Nothing is deleted');
		}else{
			$questiontag = $this->em()->getRepository('AppBundle:QuestionTag')->find($eid);
		}
		if ($questiontag==null) {
			$this->get('session')->set('admin_question_tag_ok', 'Nothing is deleted');
		}else{
			$this->em()->remove($questiontag);
			$this->em()->flush ();
			$this->get('session')->set('admin_question_tag_ok', 'Question-Tag deletion is OK');
		}


		return $this->redirect ( $this->generateUrl ( 'admin_question_tag'));

		$questiontags = $this->em()->getRepository('AppBundle:QuestionTag')->getQuestionTagsAll();
		return $this->render ( 'admin/question.tag.html.twig', array (
				'questiontags' => $questiontags,
		) );
	}
	
	/**
	 * @Route("admin/questiontag/_/aj", name="admin_question_tag_aj")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questiontagAjAction(Request $request) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		//*************RIGHTS************************************
		if (!$this->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
			throw $this->createAccessDeniedException();
		}
		//*************RIGHTS************************************
	
		if (! $request->isXmlHttpRequest()) {
			throw new NotFoundHttpException();
		}
	
		$id = $request->query->get('id');//in reality many IDs
		$act = $request->query->get('act');
		//init current user
		$ids = explode(',', $id);
		foreach ($ids as $idi){
			//dump($idi);
			$qtag = $this->em()->getRepository('AppBundle:QuestionTag')->find($idi);
			if (!$qtag) {
				//throw $this->createNotFoundException ( 'QuestionTag is not found, id='. $idi );
				$json=array("e" => 400, "html" => 'QuestionTag is not found, id='. $idi);
				return new JsonResponse($json);
			}
			if ($act=="st1"){
				$qtag->setStatus(1);
				$this->em()->persist($qtag);
			}else if ($act=="st0"){
				$qtag->setStatus(0);
				$this->em()->persist($qtag);
			}if ($act=="del"){
				$this->em()->remove($qtag);
			}
		}
		$this->em()->flush();
	
		$questiontags = $this->em()->getRepository('AppBundle:QuestionTag')->getQuestionTagsAll();
		$content = $this->
		renderView ( 'admin/question.tag.table.html.twig', array (
				'questiontags' => $questiontags,
		) );
		$json=array("e" => 200, "html" => $content);
	
		return new JsonResponse($json);
	
	}


	/**
	 * @Route("admin/questionall", name="admin_question_all")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questionAllAction(Request $request) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		$questions = $this->em()->getRepository('AppBundle:Question')->findBy(array(), array('title' => 'ASC'));
		$ql_active = $this->em()->getRepository('AppBundle:Question')->getQuestionsStatusCount();
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
		$cats = $this->em()->getRepository ( 'AppBundle:QuestionCat' )->findAll();
		return $this->render ( 'admin/question.html.twig', array (
				'quizs' => $quizs,
				'questions' => $questions,
				'cats' => $cats,
				'ql_active' => $ql_active,
		) );
	}

	/**
	 * @Route("admin/questionp/{page}", name="admin_question")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questionAction(Request $request, $page = 1) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		$q_qn = $this->em()->getRepository('AppBundle:Question')->getFindAllQuery();
		/** @var int $pages */
		$pages = PaginationHelper::getPagesCount($q_qn);

		$questions = PaginationHelper::paginate($q_qn, 10, $page);
		// $questions = $this->em()->getRepository('AppBundle:Question')->findBy(array(), array('title' => 'ASC'));
		$ql_active = $this->em()->getRepository('AppBundle:Question')->getQuestionsStatusCount();
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
		$cats = $this->em()->getRepository ( 'AppBundle:QuestionCat' )->findAll();
		return $this->render ( 'admin/question.html.twig', array (
				'quizs' => $quizs,
				'questions' => $questions,
				'cats' => $cats,
				'ql_active' => $ql_active,
				'page' => $page,        
				'pages' => $pages
		) );
	}

	/**
	 * @Route("admin/question/{eid}", name="admin_question_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questionneAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
		if ($eid==null || $eid==0){$eid=0;}
		//dump("eid ".$eid);
		$question = $this->getQuestionForm($eid);
// 		dump("count ".$question->getAnswers()->count());
 		//dump("answercount ".$question->answercount);

		$form = $this->createForm ( QuestionType::class, $question, array('em' => $this->em()) );
		//$form->get('answercount')->setData($answercount);
		//$form2 = clone $form;

		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			//dump($question->cats);
			if ($form->isValid ()) {
				//dump("answercount2 ".$question->answercount);
				$index = 1;$itrue=0;
				foreach ($question->getAnswers() as $answer){
					//dump($answer);
					//dump($index);
					if ($index > $question->answercount || $answer->getTitle()=="") {
						$question->removeAnswer($answer);
					}else{
						if ($answer->getStatus()==1) $itrue++;
					}
					$index++;
				}
				
				//add count of true answers
				$question->setTruecount($itrue);

// 				if ($question->cat!=""){
// 					$c = new QuestionCat();
// 					$c->setTitle($question->cat);
// 					$c2 = new QuizCat();
// 					$c2->setTitle($question->cat);
// 					$c->setQuizcat($c2);
// 					$this->em()->persist ( $c );
// 					$this->em()->persist ( $c2 );
// 					$question->addCat($c);
// 				}

// 				if ($question->tag!=""){
// 					$c = new QuestionTag();
// 					$c->setTitle($question->tag);
// 					$this->em()->persist ( $c );
// 					$question->addTag($c);
// 				}

				$p = $request->get ( 'question' );
				//var_dump($p);
				// resize the avatar image to 500x167

				//move new created image with id=0 to its real id-folder,  if image is selected
				if ($p ['avatar_has'] != null && $p ['avatar_has'] != '') {
					$avatar=Ses::after('tmp_', $p ['avatar']);
					if ($eid==0){
						$this->em()->persist ( $question );
						$this->em()->flush();
						if (!is_dir(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()))) {
							mkdir(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()));
						}
						rename(Ses::getUpDirTmp($this->p('img_path'),'q-0') . "/" . $p ['avatar'], Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar);
					}else{
						rename(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $p ['avatar'],
								Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar);
					}
					$question->setAvatar($avatar);
					//avatar2 - is not selected, than make small copy of 1000x333 -> 500x167
					if ($p ['avatar2_has'] == null || $p ['avatar2_has'] == '') {
						$img_constraint = array (
							'constraint' => array (
								'width' => 500,
								'height' => 167
							)
						);
						$avatar2=$avatar;//Ses::after('tmp_', $p ['avatar']);
						$avatar2=Ses::before('.', $avatar2).'2.'.Ses::after('.', $avatar2);
						//dump($avatar);
						Ses::imgResize ( Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar,
								Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar2,
								$img_constraint );
					}else{//avatar2 - is selected
						$avatar2=Ses::after('tmp_', $p ['avatar2']);
						if ($eid==0){
							rename(Ses::getUpDirTmp($this->p('img_path'),'q-0') . "/" . $p ['avatar2'], Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar2);
						}else{
							rename(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $p ['avatar2'],
									Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar2);
						}
					}
					$question->setAvatar2($avatar2);
					//if avatar2 is deleted but avatar is still there
				}elseif ($p ['avatar'] != null && $p ['avatar'] != '' && ($p ['avatar2_has'] == null || $p ['avatar2_has'] == '')) {
					$img_constraint = array (
						'constraint' => array (
							'width' => 500,
							'height' => 167
						)
					);
					$avatar=$p['avatar'];
					$avatar2=$avatar;
					$avatar2=Ses::before('.', $avatar2).'2.'.Ses::after('.', $avatar2);
					//dump($avatar);
					Ses::imgResize ( Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar,
							Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar2,
							$img_constraint );
					$question->setAvatar2($avatar2);
				}

				$this->em()->persist ( $question );
				$this->em()->flush ();

				$this->get('session')->set('admin_question', 'Question is OK');
				//dump($question);
				//dump($eid);

				if ($form->get('save_add')->isClicked()) {
					return $this->redirect ( $this->generateUrl ( 'admin_question_ne',array(
						'eid'=>'+'
					)) );
				}
				//redirect for full data submit
				return $this->redirect ( $this->generateUrl ( 'admin_question',array(
						'_'=>'y'
				)) );
				//$answercount=$question->getAnswers()->count();
// 				$form = $form2;
// 				$question = $this->getQuestionForm($eid);
// 				$form = $this->createForm ( QuestionType::class, $question );
			}else{
				$this->get('session')->set('admin_question_ok', 'Nothing is saved');
			}
		}

		return $this->render ( 'admin/question.ne.html.twig', array (
				'question' => $question,
				'form'=>$form->createView(),
				'answercount'=>$question->answercount
		) );
	}

	/**
	 * @Route("admin/question/-/{eid}", name="admin_question_d", requirements={"eid": "\d+"})
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questiondAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		if ($eid==null || $eid==0){
			$this->get('session')->set('admin_question', 'Nothing is deleted');
		}else{
			$question = $this->em()->getRepository('AppBundle:Question')->find($eid);
		}
		if ($question==null) {
			$this->get('session')->set('admin_question', 'Nothing is deleted');
		}else{
			$this->em()->remove($question);
			$this->em()->flush ();
			$this->get('session')->set('admin_question', 'Question- deletion is OK');
		}

		return $this->redirect ( $this->generateUrl ( 'admin_question'));

		$questions = $this->em()->getRepository('AppBundle:Question')->getQuestionsAll();
		return $this->render ( 'admin/question.html.twig', array (
				'questions' => $questions,
		) );
	}
	
	/**
	 * @Route("admin/question/_/aj", name="admin_question_aj")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function questionAjAction(Request $request) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		//*************RIGHTS************************************
		if (!$this->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
			throw $this->createAccessDeniedException();
		}
		//*************RIGHTS************************************
	
		if (! $request->isXmlHttpRequest()) {
			throw new NotFoundHttpException();
		}
	
		$id = $request->query->get('id');//in reality many IDs
		$act = $request->query->get('act');
		$idc = $request->query->get('idc');//in reality many IDs
		//init current user
		$ids = explode(',', $id);
		foreach ($ids as $idi){
			//dump($idi);
			$q = $this->em()->getRepository('AppBundle:Question')->find($idi);
			if (!$q) {
				//throw $this->createNotFoundException ( 'Question is not found, id='. $idi );
				$json=array("e" => 400, "html" => 'Question is not found, id='. $idi);
				return new JsonResponse($json);
			}
			if ($act=="st1"){
				$q->setStatus(1);
				$this->em()->persist($q);
			}else if ($act=="st0"){
				$q->setStatus(0);
				$this->em()->persist($q);
			}else if ($act=="cat"){
				$idcats = explode(',', $idc);
				//$q->setCats(null);
				foreach ($idcats as $idy){
					$c = $this->em()->getRepository('AppBundle:QuestionCat')->find($idy);
					$q->addCat($c);
				}
				$this->em()->persist($q);
			}if ($act=="del"){
				$this->em()->remove($q);
			}
		}
		$this->em()->flush();
	
		$questions = $this->em()->getRepository('AppBundle:Question')->getQuestionsAll();
		$content = $this->
		renderView ( 'admin/question.table.html.twig', array (
				'questions' => $questions,
		) );
		$json=array("e" => 200, "html" => $content);
	
		return new JsonResponse($json);
	
	}


	/**
	 *	questionAvatarAction
	 * @Route("aj/question/avatar", name="aj_question_avatar")
	 *
	 * @param
	 *
	 */
	public function questionAvatarAction(Request $request) {
		$ret1 = null;
		if (is_object(parent::upFotoAction1($ret1))) return $ret1;

		//TODO check username if already exist, then return validation-message, check only by new users

		$fd = $request->files->get('question');
		$un = 'q-'.$request->get('question_id');
		$ffoto = $fd['avatar_f'];//$request->files->get('user[avatar_f]', array(), true);
		//var_dump($request->get('question_id'));
		$typ="admin_avatar";
		$img_min_w = 1000;
		$img_min_h = 333;
		$img_max_w = 1000;
		$img_max_h = 333;
		//$img_p_big = array(	'constraint' => array('width' => 1000, 'height' => 333));
		//$img_p_sm = array(	'constraint' => array('width' => 500, 'height' => 167));


		$fncl='';
		$fnor='';
		$content = '';
		$id=1;$ix=1;
		/* @var UploadedFile */
		if ($ffoto != null){
			$fncl	= $ffoto->getClientOriginalName();
			$jerr = "ok";
			//FIXME - check max-size, if too big, than resize it
			if ($ffoto->getSize()>0){
				if(!in_array($ffoto->getMimeType(),$this->feImages) ) {
					$jerr = sprintf($this->p('msg_img_file_no_img'),$ffoto->getMimeType());//"File ist not an image, type is: ".$ffoto->getMimeType();
				}else{
					if ($typ=='admin_avatar')$fn_pref='avatar';
					$fnor = 'tmp_'.$fn_pref.'.'.$ffoto->guessExtension();
					$ffoto->move(Ses::getUpDirTmp($this->p('img_path'),$un), $fnor);
					//TODO Create a scheduled tasks to remove not saved images
					// check if image-path is not saved in DB, if user is offline or only more than 24h -> remove the image
					list($ioW, $ioH) = getimagesize(Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor);
					if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_small'),$img_min_w);//"Die Bildmaße stimmen nicht. Die Breite ist kleiner als ".$img_min_w."px";
					}else if ($ioH<$img_min_h){
						$jerr = sprintf($this->p('msg_img_height_too_small'),$img_min_h);//"Die Bildmaße stimmen nicht. Die Höhe ist kleiner als ".$img_min_h."px";
					}else if ($ioH>$img_max_h){
						$jerr = sprintf($this->p('msg_img_height_too_big'),$img_max_h);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_h."px";
					}else if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_big'),$img_max_w);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_w."px";
					}
					if ($ioH==$img_min_h && $ioW==$img_min_w && $ioH==$img_max_h && $ioW==$img_max_w){
						$vw='admin/question.avatar';
						$content = $this->
						renderView ( ''.$vw.'.html.twig', array (
								'fnor' => $fnor,
								$typ.'id' => $id,
								'id' => $ix,
								'un' => $un
						) );
					}
				}

				$rjson = array (
						"jcode" => 200,
						"jerr" => $jerr,
						'fncl' => $fncl,
						'fnor' => $fnor,
						$typ.'id' => $id,
						'fnid' => $ix,
						"html" => $content
				);
			}else{
				$rjson = array (
						"jcode" => 400,
						"jerr" => sprintf($this->p('msg_img_file_size_too_big'),''.$ffoto->getMaxFilesize()/1024/1024),//"Die maximale Dateigröße ".($ffoto->getMaxFilesize()/1024/1024)." MB wurde überschritten.",
						'fncl' => $fncl,
						"html" => $content,
						$typ.'id' => $id,
						'fnid' => $ix,
				);
			}
		}else{
			$rjson = array (
					"jcode" => 400,
					"jerr" => sprintf($this->p('msg_img_file_empty')),//"Bilderdatei ist leer",
					'fncl' => "NoFile",
					"html" => $content,
					$typ.'id' => $id,
					'fnid' => $ix,
			);
		}

		return new JsonResponse(
				$rjson,
				200,
				array('Content-Type'=>'application/json')
		);

	}

	/**
	 * questionAvatar2Action
	 * @Route("aj/question/avatar2", name="aj_question_avatar2")
	 *
	 * @param
	 *
	 */
	public function questionAvatar2Action(Request $request) {
		$ret1 = null;
		if (is_object(parent::upFotoAction1($ret1))) return $ret1;

		//TODO check username if already exist, then return validation-message, check only by new users

		$fd = $request->files->get('question');
		$un = 'q-'.$request->get('question_id');
		$ffoto = $fd['avatar2_f'];//$request->files->get('user[avatar_f]', array(), true);
		$typ="admin_avatar";
		$img_min_w = 500;
		$img_min_h = 167;
		$img_max_w = 500;
		$img_max_h = 167;


		$fncl='';
		$fnor='';
		$content = '';
		$id=1;$ix=1;
		/* @var UploadedFile */
		if ($ffoto != null){
			$fncl	= $ffoto->getClientOriginalName();
			$jerr = "ok";
			//FIXME - check max-size, if too big, than resize it
			if ($ffoto->getSize()>0){
				if(!in_array($ffoto->getMimeType(),$this->feImages) ) {
					$jerr = sprintf($this->p('msg_img_file_no_img'),$ffoto->getMimeType());//"File ist not an image, type is: ".$ffoto->getMimeType();
				}else{
					if ($typ=='admin_avatar')$fn_pref='avatar2';
					$fnor = 'tmp_'.$fn_pref.'.'.$ffoto->guessExtension();
					$ffoto->move(Ses::getUpDirTmp($this->p('img_path'),$un), $fnor);
					//TODO Create a scheduled tasks to remove not saved images
					// check if image-path is not saved in DB, if user is offline or only more than 24h -> remove the image
					list($ioW, $ioH) = getimagesize(Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor);
					if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_small'),$img_min_w);//"Die Bildmaße stimmen nicht. Die Breite ist kleiner als ".$img_min_w."px";
					}else if ($ioH<$img_min_h){
						$jerr = sprintf($this->p('msg_img_height_too_small'),$img_min_h);//"Die Bildmaße stimmen nicht. Die Höhe ist kleiner als ".$img_min_h."px";
					}else if ($ioH>$img_max_h){
						$jerr = sprintf($this->p('msg_img_height_too_big'),$img_max_h);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_h."px";
					}else if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_big'),$img_max_w);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_w."px";
					}
					if ($ioH==$img_min_h && $ioW==$img_min_w && $ioH==$img_max_h && $ioW==$img_max_w){
						$vw='admin/question.avatar2';
						$content = $this->
						renderView ( ''.$vw.'.html.twig', array (
								'fnor' => $fnor,
								$typ.'id' => $id,
								'id' => $ix,
								'un' => $un
						) );
					}
				}

				$rjson = array (
						"jcode" => 200,
						"jerr" => $jerr,
						'fncl' => $fncl,
						'fnor' => $fnor,
						$typ.'id' => $id,
						'fnid' => $ix,
						"html" => $content
				);
			}else{
				$rjson = array (
						"jcode" => 400,
						"jerr" => sprintf($this->p('msg_img_file_size_too_big'),''.$ffoto->getMaxFilesize()/1024/1024),//"Die maximale Dateigröße ".($ffoto->getMaxFilesize()/1024/1024)." MB wurde überschritten.",
						'fncl' => $fncl,
						"html" => $content,
						$typ.'id' => $id,
						'fnid' => $ix,
				);
			}
		}else{
			$rjson = array (
					"jcode" => 400,
					"jerr" => sprintf($this->p('msg_img_file_empty')),//"Bilderdatei ist leer",
					'fncl' => "NoFile",
					"html" => $content,
					$typ.'id' => $id,
					'fnid' => $ix,
			);
		}

		return new JsonResponse(
				$rjson,
				200,
				array('Content-Type'=>'application/json')
				);

	}

	/**
	 * @param unknown $eid
	 * @return \AppBundle\Entity\Question|object
	 */
	private function getQuestionForm($eid=null){
		if ($eid==null){
			$question = new Question();
			$question->setId(0);
			$question->setUser($this->u());
			$answercount=4;
		}else{
			$question = $this->em()->getRepository('AppBundle:Question')->find($eid);
			if ($question!=null)$answercount=$question->getAnswers()->count();
			//dump($question->getAnswers());
		}
		if ($question==null) {
			$question = new Question();
			$question->setId(0);
			$question->setUser($this->u());
			$answercount=4;
		}
		
		if ($question->getAnswers()->count()<1){
			for ($x = 1; $x <= 8; $x++) {
				//answer - 1
				$answer1 = new Answer();
				$answer1->setTitle('');
				$question->addAnswer($answer1);
			}
		}else if ($question->getAnswers()->count()<2){
			for ($x = 1; $x <= 7; $x++) {
				//answer - 1
				$answer1 = new Answer();
				$answer1->setTitle('');
				$question->addAnswer($answer1);
			}
		}else if ($question->getAnswers()->count()<3){
			$answercount=2;
			for ($x = 1; $x <= 6; $x++) {
				//answer - 1
				$answer1 = new Answer();
				$answer1->setTitle('');
				$question->addAnswer($answer1);
			}
		}else if ($question->getAnswers()->count()<4){
			$answercount=3;
			for ($x = 1; $x <= 5; $x++) {
				//answer - 1
				$answer1 = new Answer();
				$answer1->setTitle('');
				$question->addAnswer($answer1);
			}
		}else if ($question->getAnswers()->count()<5){
			$answercount=4;
			for ($x = 1; $x <= 4; $x++) {
				//answer - 1
				$answer1 = new Answer();
				$answer1->setTitle('');
				$question->addAnswer($answer1);
			}
		}else if ($question->getAnswers()->count()<6){
			$answercount=5;
			for ($x = 1; $x <= 3; $x++) {
				//answer - 1
				$answer1 = new Answer();
				$answer1->setTitle('');
				$question->addAnswer($answer1);
			}
		}else if ($question->getAnswers()->count()<7){
			$answercount=6;
			for ($x = 1; $x <= 2; $x++) {
				//answer - 1
				$answer1 = new Answer();
				$answer1->setTitle('');
				$question->addAnswer($answer1);
			}
		}else if ($question->getAnswers()->count()<8){
			$answercount=7;
			for ($x = 1; $x <= 1; $x++) {
				//answer - 1
				$answer1 = new Answer();
				$answer1->setTitle('');
				$question->addAnswer($answer1);
			}
		}else{
			$answercount=8;
		}
		$question->answercount=$answercount;
		return $question;
	}



	/**
	 * @Route("admin/quiz", name="admin_quiz")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function quizAction(Request $request) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
// 		foreach ($quizs as $quiz){
// 			$questions = array();
// 			foreach ($quiz->getCats() as $c){
// 				if (!is_null($c->getQuestioncat()->getQuestions())) {
// 					$questions = $questions + $c->getQuestioncat()->getQuestions()->toArray();
// 				}
// 			}
// 			$quiz->qcount=count($questions);
// 		}
		return $this->render ( 'admin/quiz.html.twig', array (
				'quizs' => $quizs,
		) );
	}

	/**
	 * @Route("admin/quiz/{eid}", name="admin_quiz_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function quizneAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		if ($eid==null || $eid==0){
			$eid=0;
			$quiz = new Quiz();
			$quiz->setUser($this->u());
		}else{
			$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($eid);
		}
		if ($quiz==null) {
			$quiz = new Quiz();
			$quiz->setUser($this->u());
		}
		//$quizs = array();
		
		
		$form = $this->createForm ( QuizType::class, $quiz );
		$form2 = clone $form;
		
		// Create an ArrayCollection of the current Evaluation objects in the database
		$evaluationsO = new ArrayCollection();
		foreach ($quiz->getEvaluations() as $evaluation) {
			$evaluationsO->add($evaluation);
		}

		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {

				
				$p = $request->get ( 'quiz' );
				// dump($p);
				// resize the logo image to 200x100
				//move new created logo-image with id=0 to its real id-folder,  if image is selected
				if ($p ['logo1_has'] != null && $p ['logo1_has'] != '') {
					$logo1=Ses::after('tmp_', $p ['logo1']);
					if ($eid==0){
						$this->em()->persist ( $quiz );
						$this->em()->flush();
						if (!is_dir(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()))) {
							mkdir(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()));
						}
						rename(Ses::getUpDirTmp($this->p('img_path'),'qz-0') . "/" . $p ['logo1'], Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $logo1);
					}else{
						rename(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $p ['logo1'],
								Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $logo1);
					}
					$quiz->setlogo1($logo1);
					//logo2 - is ALWAYS not selected, than make small copy of 240x100 -> 120x50
					//if ($p ['logo2_has'] == null || $p ['logo2_has'] == '') {
					// $img_constraint = array (
					// 		'constraint' => array (
					// 				'width' => 120,
					// 				'height' => 50
					// 		)
					// );
					// $logo2=$logo1;//Ses::after('tmp_', $p ['logo1']);
					// $logo2=Ses::before('.', $logo2).'2.'.Ses::after('.', $logo2);
					// //dump($avatar);
					// Ses::imgResize ( Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $logo1,
					// 		Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $logo2,
					// 		$img_constraint );
					// //}
					// $quiz->setLogo2($logo2);
				}

				//move new created logo-image with id=0 to its real id-folder,  if image is selected
				if ($p ['logo2_has'] != null && $p ['logo2_has'] != '') {
					$logo2=Ses::after('tmp_', $p ['logo2']);
					if ($eid==0){
						$this->em()->persist ( $quiz );
						$this->em()->flush();
						if (!is_dir(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()))) {
							mkdir(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()));
						}
						rename(Ses::getUpDirTmp($this->p('img_path'),'qz-0') . "/" . $p ['logo2'], Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $logo2);
					}else{
						rename(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $p ['logo2'],
								Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $logo2);
					}
					$quiz->setLogo2($logo2);
					
				}

				//move new created background-image with id=0 to its real id-folder,  if image is selected
				if ($p ['background_has'] != null && $p ['background_has'] != '') {
					$background=Ses::after('tmp_', $p ['background']);
					if ($eid==0){
						$this->em()->persist ( $quiz );
						$this->em()->flush();
						if (!is_dir(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()))) {
							mkdir(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()));
						}
						rename(Ses::getUpDirTmp($this->p('img_path'),'qz-0') . "/" . $p ['background'], Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $background);
					}else{
						rename(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $p ['background'],
								Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $background);
					}
					$quiz->setBackground($background);
				}
				
				//move new created fb1-image with id=0 to its real id-folder,  if image is selected
				if ($p ['fb1_has'] != null && $p ['fb1_has'] != '') {
					$fb1=Ses::after('tmp_', $p ['fb1']);
					if ($eid==0){
						$this->em()->persist ( $quiz );
						$this->em()->flush();
						if (!is_dir(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()))) {
							mkdir(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()));
						}
						rename(Ses::getUpDirTmp($this->p('img_path'),'qz-0') . "/" . $p ['fb1'], Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $fb1);
					}else{
						rename(Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $p ['fb1'],
								Ses::getUpDirTmp($this->p('img_path'),'qz-'.$quiz->getId()) . "/" . $fb1);
					}
					$quiz->setFb1($fb1);
				}
				//dump($quiz->getEvaluations());
				// remove the relationship between the evaluation and the Task
				foreach ($evaluationsO as $evaluation) {
					if (false === $quiz->getEvaluations()->contains($evaluation)) {
						// remove the Quiz from the Evaluation
						$evaluation->setQuiz(null);
						$this->em()->persist($evaluation);
						// delete the Evaluation entirely, you can also do that
						$this->em()->remove($evaluation);
					}
				}
				
				// dump($quiz);
				$this->em()->persist ( $quiz );
				$this->em()->flush ();
				$this->get('session')->set('admin_quiz_ok', 'Quiz is OK');
				$form = $form2;
				return $this->redirect ( $this->generateUrl ( 'admin_quiz_ne',array(
						'eid' => $quiz->getId(),
						'_'=>'y'
				)) );
			}else{
				$this->get('session')->set('admin_quiz_ok', 'Nothing is created');
			}
		}
		return $this->render ( 'admin/quiz.ne.html.twig', array (
				'quiz' => $quiz,
				'form'=>$form->createView()
		) );
	}


	/**
	 * @Route("admin/quiz/-/{eid}", name="admin_quiz_d", requirements={"eid": "\d+"})
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function quizdAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		if ($eid==null || $eid==0){
			$this->get('session')->set('admin_quiz_ok', 'Nothing is deleted');
		}else{
			$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($eid);
			$this->em()->remove($quiz);
			$this->em()->flush ();
			$this->get('session')->set('admin_quiz_ok', 'Quiz deletion is OK');
		}
		if ($quiz==null) $this->get('session')->set('admin_quiz_ok', 'Nothing is deleted');


		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
		return $this->render ( 'admin/quiz.html.twig', array (
				'quizs' => $quizs,
		) );
	}
	
	/**
	 *	quizLogo1Action
	 * @Route("aj/quiz/logo1", name="aj_quiz_logo1")
	 *
	 * @param
	 *
	 */
	public function quizLogo1Action(Request $request) {
		$ret1 = null;
		if (is_object(parent::upFotoAction1($ret1))) return $ret1;
	
		//TODO check username if already exist, then return validation-message, check only by new users
	
		$fd = $request->files->get('quiz');
		$un = 'qz-'.$request->get('quiz_id');
		$ffoto = $fd['logo1_f'];//$request->files->get('user[logo1_f]', array(), true);
		//var_dump($request->get('quiz_id'));
		$typ="admin_logo1";
		$img_min_w = 480;
		$img_min_h = 200;
		$img_max_w = 480;
		$img_max_h = 200;
		//$img_p_big = array(	'constraint' => array('width' => 1000, 'height' => 333));
		//$img_p_sm = array(	'constraint' => array('width' => 500, 'height' => 167));
	
	
		$fncl='';
		$fnor='';
		$content = '';
		$id=1;$ix=1;
		/* @var UploadedFile */
		if ($ffoto != null){
			$fncl	= $ffoto->getClientOriginalName();
			$jerr = "ok";
			//FIXME - check max-size, if too big, than resize it
			if ($ffoto->getSize()>0){
				if(!in_array($ffoto->getMimeType(),$this->feImages) ) {
					$jerr = sprintf($this->p('msg_img_file_no_img'),$ffoto->getMimeType());//"File ist not an image, type is: ".$ffoto->getMimeType();
				}else{
					if ($typ=='admin_logo1')$fn_pref='logo1';
					$fnor = 'tmp_'.$fn_pref.'.'.$ffoto->guessExtension();
					$ffoto->move(Ses::getUpDirTmp($this->p('img_path'),$un), $fnor);
					//TODO Create a scheduled tasks to remove not saved images
					// check if image-path is not saved in DB, if user is offline or only more than 24h -> remove the image
					list($ioW, $ioH) = getimagesize(Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor);
					if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_small'),$img_min_w);//"Die Bildmaße stimmen nicht. Die Breite ist kleiner als ".$img_min_w."px";
					}else if ($ioH<$img_min_h){
						$jerr = sprintf($this->p('msg_img_height_too_small'),$img_min_h);//"Die Bildmaße stimmen nicht. Die Höhe ist kleiner als ".$img_min_h."px";
					}else if ($ioH>$img_max_h){
						$jerr = sprintf($this->p('msg_img_height_too_big'),$img_max_h);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_h."px";
					}else if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_big'),$img_max_w);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_w."px";
					}
					if ($ioH==$img_min_h && $ioW==$img_min_w && $ioH==$img_max_h && $ioW==$img_max_w){
						$vw='admin/quiz.logo1';
						$content = $this->
						renderView ( ''.$vw.'.html.twig', array (
								'fnor' => $fnor,
								$typ.'id' => $id,
								'id' => $ix,
								'un' => $un
						) );
					}
				}
	
				$rjson = array (
						"jcode" => 200,
						"jerr" => $jerr,
						'fncl' => $fncl,
						'fnor' => $fnor,
						$typ.'id' => $id,
						'fnid' => $ix,
						"html" => $content
				);
			}else{
				$rjson = array (
						"jcode" => 400,
						"jerr" => sprintf($this->p('msg_img_file_size_too_big'),''.$ffoto->getMaxFilesize()/1024/1024),//"Die maximale Dateigröße ".($ffoto->getMaxFilesize()/1024/1024)." MB wurde überschritten.",
						'fncl' => $fncl,
						"html" => $content,
						$typ.'id' => $id,
						'fnid' => $ix,
				);
			}
		}else{
			$rjson = array (
					"jcode" => 400,
					"jerr" => sprintf($this->p('msg_img_file_empty')),//"Bilderdatei ist leer",
					'fncl' => "NoFile",
					"html" => $content,
					$typ.'id' => $id,
					'fnid' => $ix,
			);
		}
	
		return new JsonResponse(
				$rjson,
				200,
				array('Content-Type'=>'application/json')
				);
	
	}

		/**
	 *	quizLogo2Action
	 * @Route("aj/quiz/logo2", name="aj_quiz_logo2")
	 *
	 * @param
	 *
	 */
	public function quizLogo2Action(Request $request) {
		$ret1 = null;
		if (is_object(parent::upFotoAction1($ret1))) return $ret1;
	
		//TODO check username if already exist, then return validation-message, check only by new users
	
		$fd = $request->files->get('quiz');
		$un = 'qz-'.$request->get('quiz_id');
		$ffoto = $fd['logo2_f'];//$request->files->get('user[logo2_f]', array(), true);
		//var_dump($request->get('quiz_id'));
		$typ="admin_logo2";
		$img_min_w = 240;
		$img_min_h = 100;
		$img_max_w = 240;
		$img_max_h = 100;
		//$img_p_big = array(	'constraint' => array('width' => 1000, 'height' => 333));
		//$img_p_sm = array(	'constraint' => array('width' => 500, 'height' => 167));
	
	
		$fncl='';
		$fnor='';
		$content = '';
		$id=1;$ix=1;
		/* @var UploadedFile */
		if ($ffoto != null){
			$fncl	= $ffoto->getClientOriginalName();
			$jerr = "ok";
			//FIXME - check max-size, if too big, than resize it
			if ($ffoto->getSize()>0){
				if(!in_array($ffoto->getMimeType(),$this->feImages) ) {
					$jerr = sprintf($this->p('msg_img_file_no_img'),$ffoto->getMimeType());//"File ist not an image, type is: ".$ffoto->getMimeType();
				}else{
					if ($typ=='admin_logo2')$fn_pref='logo2';
					$fnor = 'tmp_'.$fn_pref.'.'.$ffoto->guessExtension();
					$ffoto->move(Ses::getUpDirTmp($this->p('img_path'),$un), $fnor);
					//TODO Create a scheduled tasks to remove not saved images
					// check if image-path is not saved in DB, if user is offline or only more than 24h -> remove the image
					list($ioW, $ioH) = getimagesize(Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor);
					if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_small'),$img_min_w);//"Die Bildmaße stimmen nicht. Die Breite ist kleiner als ".$img_min_w."px";
					}else if ($ioH<$img_min_h){
						$jerr = sprintf($this->p('msg_img_height_too_small'),$img_min_h);//"Die Bildmaße stimmen nicht. Die Höhe ist kleiner als ".$img_min_h."px";
					}else if ($ioH>$img_max_h){
						$jerr = sprintf($this->p('msg_img_height_too_big'),$img_max_h);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_h."px";
					}else if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_big'),$img_max_w);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_w."px";
					}
					if ($ioH==$img_min_h && $ioW==$img_min_w && $ioH==$img_max_h && $ioW==$img_max_w){
						$vw='admin/quiz.logo2';
						$content = $this->
						renderView ( ''.$vw.'.html.twig', array (
								'fnor' => $fnor,
								$typ.'id' => $id,
								'id' => $ix,
								'un' => $un
						) );
					}
				}
	
				$rjson = array (
						"jcode" => 200,
						"jerr" => $jerr,
						'fncl' => $fncl,
						'fnor' => $fnor,
						$typ.'id' => $id,
						'fnid' => $ix,
						"html" => $content
				);
			}else{
				$rjson = array (
						"jcode" => 400,
						"jerr" => sprintf($this->p('msg_img_file_size_too_big'),''.$ffoto->getMaxFilesize()/1024/1024),//"Die maximale Dateigröße ".($ffoto->getMaxFilesize()/1024/1024)." MB wurde überschritten.",
						'fncl' => $fncl,
						"html" => $content,
						$typ.'id' => $id,
						'fnid' => $ix,
				);
			}
		}else{
			$rjson = array (
					"jcode" => 400,
					"jerr" => sprintf($this->p('msg_img_file_empty')),//"Bilderdatei ist leer",
					'fncl' => "NoFile",
					"html" => $content,
					$typ.'id' => $id,
					'fnid' => $ix,
			);
		}
	
		return new JsonResponse(
				$rjson,
				200,
				array('Content-Type'=>'application/json')
				);
	
	}
	
	/**
	 *	quizBackgroundAction
	 * @Route("aj/quiz/background", name="aj_quiz_background")
	 *
	 * @param
	 *
	 */
	public function quizBackgroundAction(Request $request) {
		$ret1 = null;
		if (is_object(parent::upFotoAction1($ret1))) return $ret1;
	
		//TODO check username if already exist, then return validation-message, check only by new users
	
		$fd = $request->files->get('quiz');
		$un = 'qz-'.$request->get('quiz_id');
		$ffoto = $fd['background_f'];//$request->files->get('user[background_f]', array(), true);
		$typ="admin_background";
		$img_min_w = 1024;
		$img_min_h = 768;
		$img_max_w = 1024;
		$img_max_h = 768;
	
	
		$fncl='';
		$fnor='';
		$content = '';
		$id=1;$ix=1;
		/* @var UploadedFile */
		if ($ffoto != null){
			$fncl	= $ffoto->getClientOriginalName();
			$jerr = "ok";
			//FIXME - check max-size, if too big, than resize it
			if ($ffoto->getSize()>0){
				if(!in_array($ffoto->getMimeType(),$this->feImages) ) {
					$jerr = sprintf($this->p('msg_img_file_no_img'),$ffoto->getMimeType());//"File ist not an image, type is: ".$ffoto->getMimeType();
				}else{
					if ($typ=='admin_background')$fn_pref='background';
					$fnor = 'tmp_'.$fn_pref.'.'.$ffoto->guessExtension();
					$ffoto->move(Ses::getUpDirTmp($this->p('img_path'),$un), $fnor);
					//TODO Create a scheduled tasks to remove not saved images
					// check if image-path is not saved in DB, if user is offline or only more than 24h -> remove the image
					list($ioW, $ioH) = getimagesize(Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor);
					if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_small'),$img_min_w);//"Die Bildmaße stimmen nicht. Die Breite ist kleiner als ".$img_min_w."px";
					}else if ($ioH<$img_min_h){
						$jerr = sprintf($this->p('msg_img_height_too_small'),$img_min_h);//"Die Bildmaße stimmen nicht. Die Höhe ist kleiner als ".$img_min_h."px";
					}else if ($ioH>$img_max_h){
						$jerr = sprintf($this->p('msg_img_height_too_big'),$img_max_h);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_h."px";
					}else if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_big'),$img_max_w);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_w."px";
					}
					if ($ioH==$img_min_h && $ioW==$img_min_w && $ioH==$img_max_h && $ioW==$img_max_w){
						$vw='admin/quiz.background';
						$content = $this->
						renderView ( ''.$vw.'.html.twig', array (
								'fnor' => $fnor,
								$typ.'id' => $id,
								'id' => $ix,
								'un' => $un
						) );
					}
				}
	
				$rjson = array (
						"jcode" => 200,
						"jerr" => $jerr,
						'fncl' => $fncl,
						'fnor' => $fnor,
						$typ.'id' => $id,
						'fnid' => $ix,
						"html" => $content
				);
			}else{
				$rjson = array (
						"jcode" => 400,
						"jerr" => sprintf($this->p('msg_img_file_size_too_big'),''.$ffoto->getMaxFilesize()/1024/1024),//"Die maximale Dateigröße ".($ffoto->getMaxFilesize()/1024/1024)." MB wurde überschritten.",
						'fncl' => $fncl,
						"html" => $content,
						$typ.'id' => $id,
						'fnid' => $ix,
				);
			}
		}else{
			$rjson = array (
					"jcode" => 400,
					"jerr" => sprintf($this->p('msg_img_file_empty')),//"Bilderdatei ist leer",
					'fncl' => "NoFile",
					"html" => $content,
					$typ.'id' => $id,
					'fnid' => $ix,
			);
		}
	
		return new JsonResponse(
				$rjson,
				200,
				array('Content-Type'=>'application/json')
				);
	
	}

	/**
	 * quizFb1Action
	 * @Route("aj/quiz/fb1", name="aj_quiz_fb1")
	 *
	 * @param
	 *
	 */
	public function quizFb1Action(Request $request) {
		$ret1 = null;
		if (is_object(parent::upFotoAction1($ret1))) return $ret1;
	
		//TODO check username if already exist, then return validation-message, check only by new users
	
		$fd = $request->files->get('quiz');
		$un = 'qz-'.$request->get('quiz_id');
		$ffoto = $fd['fb1_f'];//$request->files->get('user[fb1_f]', array(), true);
		$typ="admin_fb1";
		$img_min_w = $img_max_w = 1200;
		$img_min_h = $img_max_h = 630;
		// $img_max_w = 1200;
		// $img_max_h = 630;
	
	
		$fncl='';
		$fnor='';
		$content = '';
		$id=1;$ix=1;
		/* @var UploadedFile */
		if ($ffoto != null){
			$fncl	= $ffoto->getClientOriginalName();
			$jerr = "ok";
			//FIXME - check max-size, if too big, than resize it
			if ($ffoto->getSize()>0){
				if(!in_array($ffoto->getMimeType(),$this->feImages) ) {
					$jerr = sprintf($this->p('msg_img_file_no_img'),$ffoto->getMimeType());//"File ist not an image, type is: ".$ffoto->getMimeType();
				}else{
					if ($typ=='admin_fb1')$fn_pref='fb1';
					$fnor = 'tmp_'.$fn_pref.'.'.$ffoto->guessExtension();
					$ffoto->move(Ses::getUpDirTmp($this->p('img_path'),$un), $fnor);
					//TODO Create a scheduled tasks to remove not saved images
					// check if image-path is not saved in DB, if user is offline or only more than 24h -> remove the image
					list($ioW, $ioH) = getimagesize(Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor);
					if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_small'),$img_min_w);//"Die Bildmaße stimmen nicht. Die Breite ist kleiner als ".$img_min_w."px";
					}else if ($ioH<$img_min_h){
						$jerr = sprintf($this->p('msg_img_height_too_small'),$img_min_h);//"Die Bildmaße stimmen nicht. Die Höhe ist kleiner als ".$img_min_h."px";
					}else if ($ioH>$img_max_h){
						$jerr = sprintf($this->p('msg_img_height_too_big'),$img_max_h);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_h."px";
					}else if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_big'),$img_max_w);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_w."px";
					}
					if ($ioH==$img_min_h && $ioW==$img_min_w && $ioH==$img_max_h && $ioW==$img_max_w){
						$vw='admin/quiz.fb1';
						$content = $this->
						renderView ( ''.$vw.'.html.twig', array (
								'fnor' => $fnor,
								$typ.'id' => $id,
								'id' => $ix,
								'un' => $un
						) );
					}
				}
	
				$rjson = array (
						"jcode" => 200,
						"jerr" => $jerr,
						'fncl' => $fncl,
						'fnor' => $fnor,
						$typ.'id' => $id,
						'fnid' => $ix,
						"html" => $content
				);
			}else{
				$rjson = array (
						"jcode" => 400,
						"jerr" => sprintf($this->p('msg_img_file_size_too_big'),''.$ffoto->getMaxFilesize()/1024/1024),//"Die maximale Dateigröße ".($ffoto->getMaxFilesize()/1024/1024)." MB wurde überschritten.",
						'fncl' => $fncl,
						"html" => $content,
						$typ.'id' => $id,
						'fnid' => $ix,
				);
			}
		}else{
			$rjson = array (
					"jcode" => 400,
					"jerr" => sprintf($this->p('msg_img_file_empty')),//"Bilderdatei ist leer",
					'fncl' => "NoFile",
					"html" => $content,
					$typ.'id' => $id,
					'fnid' => $ix,
			);
		}
	
		return new JsonResponse(
				$rjson,
				200,
				array('Content-Type'=>'application/json')
				);
	
	}
	

	/**
	 * @Route("admin/quizquestion/all/{eid}", name="admin_quizquestion_all")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function quizquestionallAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++

		$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($eid);

// 		$titles = array();
		$questions = array();
		foreach ($quiz->getCats() as $c){
			//dump($c->getQuestioncat()->getQuestions());
			if (!is_null($c->getQuestioncat()->getQuestions())) {
				//$questions = $questions + $c->getQuestioncat()->getQuestions()->toArray();
				//$questions = array_unique (array_merge ($questions, $c->getQuestioncat()->getQuestions()->toArray()));
				$questions = array_merge($questions,$c->getQuestioncat()->getQuestions()->toArray());
			}
		}
		$questions = array_unique($questions);

// 		$questions = $this->em()->getRepository('AppBundle:Question')
// 		->createQueryBuilder('q')
// 		->select(array('q', 'c'))
// 		->innerJoin('q.cats', 'c')
// 		->andWhere('lower(c.title) IN (:titles)')
// 		->setParameter('titles', $titles)
// 		->getQuery()->getResult();



		$question = $this->getQuestionForm();
		foreach ($quiz->getCats() as $cat) {
			$question->addCat($cat->getQuestioncat());
		}
		$form = $this->createForm ( QuizQuestionType::class, $question, array('em' => $this->em())  );

		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				$index = 1;$itrue=0;
				foreach ($question->getAnswers() as $answer){
					if ($index > $question->answercount || $answer->getTitle()=="") {
						$question->removeAnswer($answer);
					}else{
						if ($answer->getStatus()==1) $itrue++;
					}
					$index++;
				}
				//add count of true answers
				$question->setTruecount($itrue);

				$p = $request->get ( 'question' );
				//move new created image with id=0 to its real id-folder,  if image is selected
				if ($p ['avatar_has'] != null && $p ['avatar_has'] != '') {
					$avatar=Ses::after('tmp_', $p ['avatar']);
					if ($eid==0){
						$this->em()->persist ( $question );
						$this->em()->flush();
						if (!is_dir(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()))) {
							mkdir(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()));
						}
						rename(Ses::getUpDirTmp($this->p('img_path'),'q-0') . "/" . $p ['avatar'], Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar);
					}else{
						rename(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $p ['avatar'],
								Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar);
					}
					$question->setAvatar($avatar);
					//avatar2 - is not selected, than make small copy of 1000x333 -> 500x167
					if ($p ['avatar2_has'] == null || $p ['avatar2_has'] == '') {
						$img_constraint = array (
								'constraint' => array (
										'width' => 500,
										'height' => 167
								)
						);
						$avatar2=$avatar;//Ses::after('tmp_', $p ['avatar']);
						$avatar2=Ses::before('.', $avatar2).'2.'.Ses::after('.', $avatar2);
						//dump($avatar);
						Ses::imgResize ( Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar,
								Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar2,
								$img_constraint );
					}else{//avatar2 - is selected
						$avatar2=Ses::after('tmp_', $p ['avatar2']);
						if ($eid==0){
							rename(Ses::getUpDirTmp($this->p('img_path'),'q-0') . "/" . $p ['avatar2'], Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar2);
						}else{
							rename(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $p ['avatar2'],
									Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar2);
						}
					}
					$question->setAvatar2($avatar2);
					//if avatar2 is deleted but avatar is still there
				}elseif ($p ['avatar'] != null && $p ['avatar'] != '' && ($p ['avatar2_has'] == null || $p ['avatar2_has'] == '')) {
					$img_constraint = array (
							'constraint' => array (
									'width' => 500,
									'height' => 167
							)
					);
					$avatar=$p['avatar'];
					$avatar2=$avatar;
					$avatar2=Ses::before('.', $avatar2).'2.'.Ses::after('.', $avatar2);
					//dump($avatar);
					Ses::imgResize ( Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar,
							Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar2,
							$img_constraint );
					$question->setAvatar2($avatar2);
				}

				$this->em()->persist ( $question );
				$this->em()->flush ();
				
				$this->get('session')->set('admin_quizquestion_all_ok', 'Question is OK');
				return $this->redirect ( $this->generateUrl ( 'admin_quizquestion_all',array(
						'eid' => $quiz->getId(),
						'_'=>'y'
				)) );
			}else{
				$this->get('session')->set('admin_quizquestion_all_ok', 'Nothing is created');
			}
		}

		return $this->render ( 'admin/quiz.question.all.html.twig', array (
				'quiz' => $quiz,
				'question' => $question,
				'questions' => $questions,
				'form'=>$form->createView()
		) );
	}


	/**
	 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	 *
	 * This is not need any more, it stay here only for Example
	 *
	 * @Route("admin/quezquestion/aj", name="admin_quizquestion_aj")
	 *
	 * @param Request $request
	 * @throws NotFoundHttpException
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\JsonResponse
	 */
	public function quizquestionAjAction(Request $request)
	{
		//*************RIGHTS************************************
		if (!$this->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
			throw $this->createAccessDeniedException();
		}
		//*************RIGHTS************************************

		if (! $request->isXmlHttpRequest()) {
			throw new NotFoundHttpException();
		}

		$id1 = $request->query->get('id1');
		$id2 = $request->query->get('id2');
		$act = $request->query->get('act');
		//init current user
		//TODO check if Quiz-Cat is equal to Question-Cat, if not then Exception
		$quiz=null;$question=null;
		$quiz = $this->em()->getRepository ( 'AppBundle:Quiz' )->find ( $id1 );
		if (!$quiz) throw $this->createNotFoundException ( 'Quiz is not found, id='. $id1 );
		if ($act=="add"){
			$question = $this->em()->getRepository ( 'AppBundle:Question' )->find ( $id2 );
			if (!$question) throw $this->createNotFoundException ( 'Question is not found, id='. $id2 );
			//$qq = new QuizQuestion($quiz,$question);
			//$this->em()->persist($qq);
			$this->em()->flush();
		}elseif ($act=="rem"){
			$qqs = $quiz->getQuizquestions();
			foreach ($qqs as $qq) {
				if ($qq->getQuestion()->getId()==$id2) {
					//$quiz->removeQuizquestion($qq);
					$this->em()->remove($qq);
				}
			}
			//$this->em()->persist($qq);
			$this->em()->flush();
		}elseif ($act=="addall"){
			$ids = explode(',', $id2);
			foreach ($ids as $id) {
				$question = $this->em()->getRepository ( 'AppBundle:Question' )->find ( $id );
				if (!$question) throw $this->createNotFoundException ( 'Question is not found, id='. $id );
				//$qq = new QuizQuestion($quiz,$question);
				//$this->em()->persist($qq);
			}
			$this->em()->flush();
		}elseif ($act=="remall"){
			$ids = explode(',', $id2);
			foreach ($ids as $id) {
				$qqs = $quiz->getQuizquestions();
				foreach ($qqs as $qq) {
					if ($qq->getQuestion()->getId()==$id) {
						//$quiz->removeQuizquestion($qq);
						$this->em()->remove($qq);
					}
				}
			}
			//$this->em()->persist($qq);
			$this->em()->flush();
		}


		return new JsonResponse([]);
	}

	/**
	 * remove score for admins
	 * 
	 * @Route("admin/score/remove/aj", name="admin_score_remome_aj")
	 */
	public function removeAction(Request $request) {
		//*************RIGHTS************************************
		if (!$this->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
			throw $this->createAccessDeniedException();
		}
		//*************RIGHTS************************************

		if (! $request->isXmlHttpRequest()) {
			throw new NotFoundHttpException();
		}

		$ascores=array();

		$scores = $this->em()->getRepository('AppBundle:Score')->findAll();
		foreach ($scores as $score) {
			$user = $score->getUser();
			if ($user->isGranted('ROLE_ADMIN')){
				// dump($score);
				$ascores['a'.$score->getId()]  = 'a'.$score->getUser()->getId();
				$this->em()->remove($score);
			}
			
		}
		$scores = $this->em()->getRepository('AppBundle:Scorem')->findAll();
		foreach ($scores as $score) {
			$user = $score->getUser();
			if ($user->isGranted('ROLE_ADMIN')){
				// dump($score);
				$ascores['m'.$score->getId()]  = 'm'.$score->getUser()->getId();
				$this->em()->remove($score);
			}
		}
		if (empty($ascores)){
			$json=array("e" => 200, "html" => "Es gibt keine Admin-Punkte", $ascores);
		}else{
			$this->em()->flush ();
			$json=array("e" => 200, "html" => "Alle Admin-Punkte sind gelöscht", $ascores);
		}
		
		return new JsonResponse($json);
	}
}

