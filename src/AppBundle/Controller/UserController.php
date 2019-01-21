<?php
// src/AppBundle/Controller/UserController.php
namespace AppBundle\Controller;


use AppBundle\Form\UserMyType;
use AppBundle\Form\UserNotiType;
use AppBundle\Form\UserPassword;
use AppBundle\Form\UserPasswordType;
use AppBundle\Form\UserUsernameType;
use AppBundle\Utils\Ses;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends QController {
	
	
	/**
	 * @Route("my/user", name="my_user")
	 */
	public function usereAction(Request $request,$eid=null) {
		// *************RIGHTS************************************
		if (! $this->get ( 'security.authorization_checker' )->isGranted ( 'IS_AUTHENTICATED_FULLY' )) {
			return $this->redirect ( $this->generateUrl ( 'lgn' ) );
		}
		if ($this->u()->getStatus()===9 || $this->u()->getStatus()===5){
			return $this->redirect ( $this->generateUrl ( 'home' ) );
		}
		//*************RIGHTS************************************
	
	
		$form = $this->createForm ( UserMyType::class, $this->u() ); 
		$form2 = clone $form;
			
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//dump($this->u()->getAvatar());
				$p = $request->get ( 'user' );
				//dump(($p ['avatar_x'] != null && $p ['avatar_x'] != ''));
				// crop & resize the avatar image
				if ($p ['avatar_x'] != null && $p ['avatar_x'] != '') {
					if (!Ses::imgCrop (
							Ses::getUpDirTmp($this->p('img_path'), $this->u()->getUnid() ) . "/" . $p ['avatar'],
							$p ['avatar_x'],
							$p ['avatar_y'],
							$p ['avatar_w'],
							$p ['avatar_h'] )) {
								$this->get('session')->set ( "my_user_ok", 'The Image-Crop-Function return false, check logs' );
							}
						
					$img_constraint = array (
							'constraint' => array (
									'width' => 200,
									'height' => 200
							)
					);
					$avatar=Ses::after('tmp_', $p ['avatar']);
					//dump($avatar);
					Ses::imgResize ( Ses::getUpDirTmp($this->p('img_path'),$this->u()->getUnid()) . "/" . $p ['avatar'], Ses::getUpDirTmp($this->p('img_path'),$this->u()->getUnid()) . "/" . $avatar, $img_constraint );
					$this->u()->setAvatar($avatar); 
				}
				
				$this->em()->persist ( $this->u() );
				$this->em()->flush ();
				$this->get('session')->set('my_user_ok', 'User is OK');
				$form = $form2;//disable a message for resend data by page-refresh
				return $this->redirect ( $this->generateUrl ( 'my_user', array (
					'_'=>'y'
				)));
			}else{
				$this->get('session')->set('my_user_ok', 'Nothing is created');
			}
		}
		
		return $this->render ( 'user/user.html.twig', array (
				'form'=>$form->createView()
		) );
	}
	
	/**
	 * @Route("my/remove/aj", name="my_remove_aj")
	 */
	public function removeAction(Request $request) {
		// $json=array("e" => 201, "html" => "User is not logged in");
		// return new JsonResponse($json);
		if( !$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
			$json=array("e" => 201, "html" => "User is not logged in");
			return new JsonResponse($json);
		}
		if ($this->u()->getStatus()===9 || $this->u()->getStatus()===5){
			$json=array("e" => 201, "html" => "User is not activated or guest");
			return new JsonResponse($json);
		}
		
		//admins could not be removed
		if ($this->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
			$json=array("e" => 202, "html" => 'User is NOT removed, cos ROLE_ADMIN ');
			return new JsonResponse($json);
		}

		//deactivate user first, if any errros
		$this->u()->setStatus(0);
		$this->em()->flush ();
		//init current user
		$questions = $this->em()->getRepository('AppBundle:Question')->findBy(array('user'=>$this->u()->getId()));
		foreach ($questions as $question) {
			$question->setUser(null);
		}
		$scores = $this->em()->getRepository('AppBundle:Score')->findBy(array('user'=>$this->u()->getId()));
		foreach ($scores as $score) {
			$this->em()->remove($score);
		}
		$scores = $this->em()->getRepository('AppBundle:Scorem')->findBy(array('user'=>$this->u()->getId()));
		foreach ($scores as $score) {
			$this->em()->remove($score);
		}
		$this->em()->remove($this->u());
		$this->em()->flush ();
		$this->get('session')->set('my_remove_ok', 'User remove is OK');
		$this->get('security.token_storage')->setToken(null);
		$request->getSession()->invalidate();
		
		$json=array("e" => 200, "html" => "ok");
		return new JsonResponse($json);
	}

	/**
	 * @Route("my/remove/send", name="my_remove_send")
	 */
	public function removeSendAction(Request $request) {
		if( !$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
			return $this->redirect ( $this->generateUrl ( 'lgn') );
		}

		if ($this->u()->getStatus()===9 || $this->u()->getStatus()===5){
			return $this->redirect ( $this->generateUrl ( 'home' ) );
		}
		
		$comment = $request->request->get('_remove_reason');
		
		//admins could not be removed
		if ($this->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
			$this->get('session')->set('my_remove_ok', 'User is NOT removed, cos ROLE_ADMIN '.$comment);
			return $this->render ( 'user/delete.html.twig', array (
			) );
			//return $this->redirect ( $this->generateUrl ( 'my_delete') );
		}
		//init current user
		
		if ($this->p("notify_off")=="1"){
			//TODO - Log it for admins
		}else{
			// $subj = $this->r('PlaceHolder')->findOneBy(array('ph'=>'[#mail_subj_user_remove_comment#]','quiz'=>$this->p('quiz_id')));
			$nm = $this->get('app.notify.manager');
			if (!$nm->send(array(
					'quiz_id'=>$this->p('quiz_id'),
					'to'=>$this->p('mail_to_support'),
					'from'=>$this->u()->getEmail(),
					's'=>'[#mail_subj_user_remove_comment#]',
					'bn'=>'user.remove.comment',
					'bo'=>array('username' => $this->u()->getUsername(),'comment'=>$comment)
			))){
				//TODO Show error-page: Mail is not send, try again
			}
		}
		
		$this->get('security.token_storage')->setToken(null);
		$request->getSession()->invalidate();
		
		return $this->redirect ( $this->generateUrl ( 'home') );
	}
	
	/**
	 * @Route("my/email", name="my_email")
	 */
	public function emailAction(Request $request) {
		if( !$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
			return $this->redirect ( $this->generateUrl ( 'lgn') );
		}
		if ($this->u()->getStatus()===9 || $this->u()->getStatus()===5){
			return $this->redirect ( $this->generateUrl ( 'home' ) );
		}
		//init current user
		// $session = $request->getSession();
		$this->get('session')->set ( 'my_email_valid', '' );
	
		//$up = new UserEmail();
		$form = $this->createForm ( UserNotiType::class, $this->u() );
		$form2 = clone $form;
		
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			//if ($form->isValid ()) {
				// TODO: Persist the ui entity
				$this->em()->persist ( $this->u() );
				$this->em()->flush ();
				$this->get('session')->set ( 'my_email_valid', '' );
				$form = $form2;//disable a message for resend data by page-refresh
				return $this->redirect ( $this->generateUrl ( 'my_email', array (
					'_'=>'y'
				)));
			//} else {
				// @TODO Error hanlder write to log and show to user
				//$this->get('session')->set ( "my_email_valid",$form->getErrors() );
			//}
		}
	
		return $this->render ( 'user/email.html.twig', array (
				'form' => $form->createView () ,
		) );
	}
	
	
	/**
	 * @Route("my/password", name="my_password") 
	 */
	public function passwordAction(Request $request) {
		if( !$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
			return $this->redirect ( $this->generateUrl ( 'lgn') );
		}
		if ($this->u()->getStatus()===9 || $this->u()->getStatus()===5){
			return $this->redirect ( $this->generateUrl ( 'home' ) );
		}
		//init current user
		// $session = $request->getSession();
		$this->get('session')->set ( 'my_password_valid', '' );
		
		$up = new UserPassword();
	
		//$up = new UserPassword();
		$form = $this->createForm ( UserPasswordType::class, $up );
		$form2 = clone $form;
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			//if ($form->isValid ()) {
				$p = $request->get ( 'user' );
				$encoder = $this->container->get('security.password_encoder');
				// $old_pwd = $encoder->encodePassword($this->u(), $p['pwd']);
				// $old_pwd = $p['pwd'];
				// dump($old_pwd);
				// dump($this->u()->getPassword());
				// if($old_pwd != $this->u()->getPassword()) {
				// 	$this->get('session')->set ( "valid_password_match","Alte Passwort ist falsch" );
				// 	return $this->render ( 'user/password.html.twig', array (
				// 			'form' => $form->createView () ,
				// 	) );
				// }

				if (!$encoder->isPasswordValid($this->u(), $p['pwd'])) {
					$this->get('session')->set ( "valid_password_match","Alte Passwort ist falsch" );
					return $this->render ( 'user/password.html.twig', array (
							'form' => $form->createView () ,
					) );
				}
				// $encoder = $this->container->get('security.encoder_factory')->getEncoder($user);
            	// $password = $encoder->encodePassword($this->u()->getPassword(), $user->getSalt());
            	// $user->setPassword($password);

				// 3) Encode the password (you could also do this via Doctrine listener)
				// $encoder = $this->container->get('security.password_encoder');
				$password = $encoder->encodePassword($this->u(), $up->password);
				$this->u()->setPassword($password);
				// $this->u()->setPassword($up->password);
				$this->em()->persist ( $this->u() );
				$this->em()->flush ();
				$this->get('session')->set ( 'valid_password_match', '' );
				$form = $form2;//disable a message for resend data by page-refresh
				return $this->redirect ( $this->generateUrl ( 'my_user', array (
					'_'=>'y'
				)));
// 			} else {
// 				// @TODO Error hanlder write to log and show to user
// 				$this->get('session')->set ( "my_password_valid",$form->getErrors() );
// 			}
		}
	
		return $this->render ( 'user/password.html.twig', array (
				'form' => $form->createView () ,
		) );
	}
	
	/**
	 * @Route("my/logout", name="my_logout")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function logoutAction(Request $request) {
		if( !$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
			return $this->redirect ( $this->generateUrl ( 'lgn') );
		}
		if ($this->u()->getStatus()===9 || $this->u()->getStatus()===5){
			return $this->redirect ( $this->generateUrl ( 'home' ) );
		}
		return $this->render ( 'user/logout.html.twig', array (
		) );
	}
	
	/**
	 * @Route("my/delete", name="my_delete")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function deleteAction(Request $request) {
		if( !$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
			return $this->redirect ( $this->generateUrl ( 'lgn') );
		}
		if ($this->u()->getStatus()===9 || $this->u()->getStatus()===5){
			return $this->redirect ( $this->generateUrl ( 'home' ) );
		}
		return $this->render ( 'user/delete.html.twig', array (
		) );
	}

}