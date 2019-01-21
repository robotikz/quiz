<?php
// src/AppBundle/Controller/SecurityController.php
namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Form\UserActivate;
use AppBundle\Form\UserActivateType;
use AppBundle\Form\UserPasswordResetType;
use AppBundle\Form\UserRegType;
use AppBundle\Utils\Ses;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response; 
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SecurityController extends QController {
	
	/**
	 * @Route("loginfb", name="loginfb")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function loginfbAction(Request $request) {
		
		return $this->render('security/login.fb.html.twig');
	}
	
	/**
	 * @Route("lgn", name="lgn")
	 * 
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function loginAction(Request $request) {
		// $session = $request->getSession ();
		
		$authenticationUtils = $this->get('security.authentication_utils');

	    // get the login error if there is one
	    $error = $authenticationUtils->getLastAuthenticationError();
	
	    // last username entered by the user
	    $lastUsername = $authenticationUtils->getLastUsername();
		
		$activate = $this->get('session')->get ( "me_acktivate_ok" );
		
		//error_log( print_r( 'ffff', true ) );
		// dump($error);	
		
		return $this->render ( 'security/login.html.twig', array (
				'last_username' => $lastUsername,
				'error' => $error,
				'activate' => $activate,
		) );
	}

	/**
	 * @Route("lgn/aj", name="lgn_aj")
	 * 
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function loginAjAction(Request $request) {
		// $session = $request->getSession ();
		
		$authenticationUtils = $this->get('security.authentication_utils');

	    // get the login error if there is one
	    $error = $authenticationUtils->getLastAuthenticationError();
	
	    // last username entered by the user
	    $lastUsername = $authenticationUtils->getLastUsername();
		
		$activate = $this->get('session')->get ( "me_acktivate_ok" );
		
		$content = $this->renderView ( 'global/dlg.login.html.twig', array (
				'last_username' => $lastUsername,
				'error' => $error,
				'activate' => $activate,
		) );

		$json=array("e" => 200, "html" => $content);

		return new JsonResponse($json);
		
	}
	
	
	/**
	 * @Route("reg", name="security_reg")
	 * 
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function regAction(Request $request) {
		// guest
		if ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')
		 && $this->u()->getStatus()===9){
			$this->get('security.token_storage')->setToken(null);
			$this->get('session')->invalidate();
			return $this->redirect ( $this->generateUrl ( 'security_reg') );
		}
		//anonymous
		if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
			
			$s = $request->getSession();
			$user = new User();
			if ( $s->has('fb_email')) $user->setEmail($s->get('fb_email'));
			if ( $s->has('fb_username')) $user->setUsername($s->get('fb_username'));
			if ( $s->has('fb_firstname')) $user->setFname($s->get('fb_firstname'));
			if ( $s->has('fb_lastname')) $user->setLname($s->get('fb_lastname'));
			// if ($request->getMethod() == Request::METHOD_POST){
			// 	$d = $request->request->get('user');
			// 	$user->setEmail($d['email']);
			// 	$user->setUsername($d['username']); 
			// 	$user->setFname($d['fname']);
			// 	$user->setLname($d['lname']);
			// }

			$form = $this->createForm ( UserRegType::class, $user );
			
			if ($request->isMethod ( 'POST' )) {
				//$form->handleRequest ( $request );
				$form->handleRequest ( $request );
				$gr = $this->grecaptcha($request->get('g-recaptcha-response'));
				if (!isset($gr["success"]) || $gr["success"]==false){
					if (isset($gr["exception"])){
						// $form->get('grecaptcha')->addError(new FormError($this->p('e_g_recaptcha')." - ".$gr["error-codes"]));
						$this->addFlash(
							'error',
							$this->p('e_g_recaptcha')." - ".$gr["error-codes"]
						);             
					}else{
						// $form->get('grecaptcha')->addError(new FormError($this->p('e_g_recaptcha')));
						$this->addFlash(
							'error',
							$this->p('e_g_recaptcha')
						);             
					}
					return $this->render ( 'security/reg.html.twig', array (
						'form' => $form->createView(),
					) );
				}

				if ($form->isValid()) {
					// by registration use is not active, but for 48 hours is active
					$user->setStatus(5);
					//if facebook registration, save fid to db
					if ($s->has('fb_fid')){
						$user->setFid($s->get('fb_fid'));
					}
					//$user->setUsername(Ses::before('@', $user->getEmail()));
					//$this->em()->persist($user);
					
					//create role
					$ur = $this->em()->getRepository('AppBundle:UserRole')->findOneBy(array('role'=>'ROLE_USER'));//new UserRole();
					$user->addUserRole($ur);
					//copy avatar.jpg to user folder
					$user->setAvatar('');
					if (!file_exists(Ses::getUpDirTmp($this->p('img_path'),$user->getUnid()).'/')) {
						mkdir(Ses::getUpDirTmp($this->p('img_path'),$user->getUnid()).'/', 0777, true);
					}
					if (file_exists(Ses::getUpDirImg($this->p('img_path')).'/avatar.jpg')) {
						copy(Ses::getUpDirImg($this->p('img_path')).'/avatar.jpg', Ses::getUpDirTmp($this->p('img_path'),$user->getUnid()).'/avatar.jpg');
						$user->setAvatar('avatar.jpg');
					}elseif(file_exists(Ses::getUpDirImg($this->p('img_path')).'/avatar.png')) {
						copy(Ses::getUpDirImg($this->p('img_path')).'/avatar.png', Ses::getUpDirTmp($this->p('img_path'),$user->getUnid()).'/avatar.png');
						$user->setAvatar('avatar.png');
					}else{
						$user->setAvatar('');
					}
					
					// 3) Encode the password (you could also do this via Doctrine listener)
					$encoder = $this->container->get('security.password_encoder');
					$password = $encoder->encodePassword($user, $user->getPassword());
					$user->setPassword($password);

					$this->em()->persist($user);
					$this->em()->flush();

					//login the user
					$token = new UsernamePasswordToken($user, null, 'socials', $user->getRoles());
					$this->get('security.token_storage')->setToken($token);
					// $session = $request->getSession();
					$this->get('session')->set('_security_'.'socials', serialize($token));
					
					//$this->get('session')->set ( "me_reg_user",$user->getUsername() );
					//if global mail send is on
					if ($this->p("notify_off")=="1"){
						//return $this->redirect($this->generateUrl('security_activate',array('username' => $user->getUsername(),'token'=>$user->getUnid())));
						return $this->redirect ( $this->generateUrl ( 'home' ) );
					}else{
						// $subj = $this->r('PlaceHolder')->findOneBy(array('ph'=>'[#mail_subj_user_activate#]'));
						$nm = $this->get('app.notify.manager');
						if (!$nm->send(array(
								'quiz_id'=>$this->p('quiz_id'),
								'to'=>$user->getEmail(),
								'from'=>$this->p('mail_reg_from_adr'),
								'fromn'=>$this->p('mail_reg_from_nam'),
								's'=>'[#mail_subj_user_activate#]',
								'bn'=>'user.activate',
								'bo'=>array('user' => $user, 'r'=>'')//,'quiz'=>$quiz - in Twig-Globals
						))){
							//TODO Show error-page: Mail is not send, try again
						}
					}
					//return $this->redirect($this->generateUrl('security_activate', array('user' => $user)));
					//return $this->redirect($this->generateUrl('security_activate',array('username' => $user->getUsername(),'token'=>$user->getUnid())));
					return $this->redirect ( $this->generateUrl ( 'home' ) );
				}else{
					//@TODO Error hanlder write to log and show to user
					//$this->get('session')->set ( "me_reg_valid",$form->getErrors() );
				}
			}
			return $this->render ( 'security/reg.html.twig', array (
					'form' => $form->createView(),
			) );
		}
		return $this->render ( 'security/logoff.html.twig', array (
		) );
	}

	/**
	 * @Route("reg/aj", name="security_reg_aj")
	 * 
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function regAjAction(Request $request) {
		//guest
		// if ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')
		//  && $this->u()->getStatus()===9){
		// 	$this->get('security.token_storage')->setToken(null);
		// 	//$this->get('session')->invalidate();
		// 	return $this->redirect ( $this->generateUrl ( 'security_reg_aj') );
		// }
		//anonymous or guest
		if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') || $this->u()->getStatus()===9){
			
			$s = $request->getSession();
			$user = new User();
			if ( $s->has('fb_email')) $user->setEmail($s->get('fb_email'));
			if ( $s->has('fb_username')) $user->setUsername($s->get('fb_username'));
			if ( $s->has('fb_firstname')) $user->setFname($s->get('fb_firstname'));
			if ( $s->has('fb_lastname')) $user->setLname($s->get('fb_lastname'));
			$form = $this->createForm ( UserRegType::class, $user );
			
			$quiz_id = $this->p('quiz_id');
			if ($quiz_id==null  || $quiz_id==''){
				//throw $this->createNotFoundException ( 'Vairable quiz_id is not found');
				$this->get('session')->set ( "m",  'Vairable quiz_id is not found');//$this->p('msg_security_non_anonymous_authenticated'));
				return $this->render ('security/error.html.twig');
			}

			if ($request->isMethod ( 'POST' )) {
				$form->handleRequest ( $request );
				if ($form->isValid()) {
					// by registration user is not active
					$user->setStatus(5);
					//if facebook registration, save fid to db
					if ($s->has('fb_fid')){
						$user->setFid($s->get('fb_fid'));
					}
					//$user->setUsername(Ses::before('@', $user->getEmail()));
					//$this->em()->persist($user);
					//$user->setAvatar('avatar.jpg');
					//create role
					$ur = $this->em()->getRepository('AppBundle:UserRole')->findOneBy(array('role'=>'ROLE_USER'));//new UserRole();
					$user->addUserRole($ur);
					//copy avatar.jpg to user folder
					$user->setAvatar('');
					if (!file_exists(Ses::getUpDirTmp($this->p('img_path'),$user->getUnid()).'/')) {
						mkdir(Ses::getUpDirTmp($this->p('img_path'),$user->getUnid()).'/', 0777, true);
					}
					if (file_exists(Ses::getUpDirImg($this->p('img_path')).'/avatar.jpg')) {
						copy(Ses::getUpDirImg($this->p('img_path')).'/avatar.jpg', Ses::getUpDirTmp($this->p('img_path'),$user->getUnid()).'/avatar.jpg');
						$user->setAvatar('avatar.jpg');
					}elseif(file_exists(Ses::getUpDirImg($this->p('img_path')).'/avatar.png')) {
						copy(Ses::getUpDirImg($this->p('img_path')).'/avatar.png', Ses::getUpDirTmp($this->p('img_path'),$user->getUnid()).'/avatar.png');
						$user->setAvatar('avatar.png');
					}else{
						$user->setAvatar('');
					}

					// 3) Encode the password (you could also do this via Doctrine listener)
					$encoder = $this->container->get('security.password_encoder');
					$password = $encoder->encodePassword($user, $user->getPassword());
					$user->setPassword($password);
					
					$this->em()->persist($user);
					$this->em()->flush();

					//login the user
					$token = new UsernamePasswordToken($user, null, 'socials', $user->getRoles());
					$this->get('security.token_storage')->setToken($token);
					// $session = $request->getSession();
					$this->get('session')->set('_security_'.'socials', serialize($token));

					//save highscore for new registered user
					$quiz_id = $this->p('quiz_id');
					if ($quiz_id==null  || $quiz_id==''){
						$this->get('session')->set ( "m",  'Vairable quiz_id is not found');//$this->p('msg_security_non_anonymous_authenticated'));
						return $this->render ('security/error.html.twig');
					}
					$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));
					$guest_score = $this->get('session')->get('guest_score'.'_'.$quiz_id);
					if (!is_null($guest_score)){
						// to save in the db, only for registired users
						$score = $this->em()->getRepository('AppBundle:Score')->findOneBy(array('user'=>$user->getId(),'quiz'=>$quiz_id));
						if ($score){
							$score->setScore($guest_score->getScore());
							$this->em()->flush($score);
						}else{
							$guest_score->setQuiz($quiz);
							$guest_score->setUser($user);
							$this->em()->persist($guest_score);
							$this->em()->flush();
						}
						$this->get('session')->remove('guest_score');
					}else{
						//throw $this->createNotFoundException ( 'Vairable guest_score is not found');
						$this->get('session')->set ( "m",  'Vairable guest_score is not found');//$this->p('msg_security_non_anonymous_authenticated'));
						return $this->render ('security/error.html.twig');
					}
					//$this->get('session')->set ( "me_reg_user",$user->getUsername() );
					//if global mail send is on
					if ($this->p("notify_off")=="1"){
						//return $this->redirect($this->generateUrl('security_activate',array('username' => $user->getUsername(),'token'=>$user->getUnid())));
						return $this->redirect ( $this->generateUrl ( 'highscore' ) );
					}else{
						// $subj = $this->r('PlaceHolder')->findOneBy(array('ph'=>'[#mail_subj_user_activate#]'));
						$nm = $this->get('app.notify.manager');
						if (!$nm->send(array(
								'quiz_id'=>$this->p('quiz_id'),
								'to'=>$user->getEmail(),
								'from'=>$this->p('mail_reg_from_adr'),
								'fromn'=>$this->p('mail_reg_from_nam'),
								's'=>'[#mail_subj_user_activate#]',
								'bn'=>'user.activate',
								'bo'=>array('user' => $user, 'r'=>'highscore')//,'quiz'=>$quiz - in Twig-Globals
						))){
							//TODO Show error-page: Mail is not send, try again
						}
					}
					//return $this->redirect($this->generateUrl('security_activate', array('user' => $user)));
					//return $this->redirect($this->generateUrl('security_activate',array('username' => $user->getUsername(),'token'=>$user->getUnid())));
					return $this->redirect ( $this->generateUrl ( 'highscore' ) );
				}else{
					//@TODO Error hanlder write to log and show to user
					//$this->get('session')->set ( "me_reg_valid",$form->getErrors() );
				}
			}
			// return $this->render ( 'security/reg.aj.html.twig', array (
			// 		'form' => $form->createView(),
			// ) );
			$content = $this->renderView ( 'global/dlg.reg.html.twig', array (
				'form' => $form->createView(),
			) );
			$json=array("e" => 200, "html" => $content);
			return new JsonResponse($json);
		}
		$json=array("e" => 390, "html" => "User is not anonymous & not a guest");
		return new JsonResponse($json);
	}
	
	
	
	/**
	 * @Route("activate", name="security_activate")
	 * 
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function activateAction(Request $request) {
		if( $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')
		&& $this->u()->getStatus()!==5){
			//  authenticated (NON anonymous)
			return $this->redirect($this->generateUrl('home'));
		}else{
			$em = $this->getDoctrine ()->getManager ();
			//$user = $this->get('security.token_storage')->getToken()->getUser();
			$ua = new UserActivate();
			//$ua->username=$this->get('session')->get ( "me_acktivate_user");
			if ($request->query->get('username')!==""){
				$ua->username=$request->query->get('username');
			}
			if ($request->query->get('token')!==""){
				$ua->token=$request->query->get('token');
			}
			if ($request->query->get('r')!==""){
				$redirect=$request->query->get('r');
			}
			$form = $this->createForm(UserActivateType::class, $ua, array('em' => $em)); 
			if ($request->isMethod('POST')) {
				$form->handleRequest ( $request );
				if ($form->isValid()) {
					$user = $this->em()->getRepository('AppBundle:User')->getUserByActivation($ua->username,$ua->token);
					if ($user != null){
						// everything is OK
						$user->setStatus(1);
						$this->em()->persist($user);
						$this->em()->flush();
						//$this->get('session')->set ( "me_acktivate_valid","" );
						if (!isset($redirect) || $redirect===''){
							return $this->redirect($this->generateUrl('security_wellcome', array ('_' => 'a' )));
						}else{
							return $this->redirect($this->generateUrl($redirect));
						}
					}else{
						//$this->get('session')->set ( "me_acktivate_valid",$this->p('valid_activate') );
						return $this->redirect($this->generateUrl('security_activate'));
						//return $this->redirect($this->generateUrl('security_activate',array('lgn' => $ua->username,'token'=>$ua->token,'.'=>'')));
					}
				} else{
					//@TODO Error hanlder write to log and show to user
					//$this->get('session')->set ( "me_acktivate_valid",$form->getErrors() );
				}
			}
			return $this->render ('security/activate.html.twig', array (
					'form' => $form->createView(),
					'ua' => $ua
			) );
		}
	}
	
	/**
	 * @Route("confirm", name="security_confirm")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function confirmAction(Request $request) {
		if( $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')
		&& $this->u()->getStatus()!==5){
			//  authenticated (NON anonymous)
			return $this->redirect($this->generateUrl('home'));
		}else{
			$em = $this->getDoctrine ()->getManager ();
			//$user = $this->get('security.token_storage')->getToken()->getUser();
			$ua = new UserActivate();
			
			if (!$request->isMethod('POST')) {
				if ($request->query->get('username')=="" || $request->query->get('token')==""){
					return $this->redirect($this->generateUrl('security_activate'));
				}
				if ($request->query->get('username')!==""){
					$ua->username=$request->query->get('username');
				}
				if ($request->query->get('token')!==""){
					$ua->token=$request->query->get('token');
				}
				if ($request->query->get('r')!==""){
					$redirect=$request->query->get('r');
				}
				$user = $this->em()->getRepository('AppBundle:User')->getUserByActivation($ua->username,$ua->token);
				if (!is_null($user)){
					if ($user->getStatus()!==1){ //if user is realy not confirm his mail
						// everything is OK
						$user->setStatus(1);
						$this->em()->persist($user);
						$this->em()->flush();
						
						if ($this->p("notify_off")=="1"){
							//TODO - Log it for admins
						}else{
							// $subj = $this->r('PlaceHolder')->findOneBy(array('ph'=>'[#mail_subj_user_wellcome#]'));
							//$subj = str_replace('[#company_name#]',$subj,$this->r('PlaceHolder')->findOneBy(array('ph'=>'[#company_name#]')));
							$nm = $this->get('app.notify.manager');
							if (!$nm->send(array(
									'quiz_id'=>$this->p('quiz_id'),
									'to'=>$user->getEmail(),
									'from'=>$this->p('mail_reg_from_adr'),
									'fromn'=>$this->p('mail_reg_from_nam'),
									's'=>'[#mail_subj_user_wellcome#]',
									'bn'=>'user.wellcome',
									'bo'=>array('user' => $user)//,'quiz'=>$quiz - in Twig-Globals
							))){
								//TODO Show error-page: Mail is not send, try again
							}
						}
						//$this->get('session')->set ( "me_acktivate_valid","" );
						if (!isset($redirect) || $redirect===''){
							return $this->redirect($this->generateUrl('security_wellcome', array ('_' => 'a' )));
						}else{
							return $this->redirect($this->generateUrl($redirect));
						}
					}
					return $this->redirect($this->generateUrl('security_wellcome', array ('_' => 'b' )));
					
				}else{
					//$this->get('session')->set ( "me_acktivate_valid",$this->p('valid_activate') );
					return $this->redirect($this->generateUrl('security_activate'));
				}
			}
			
			$form = $this->createForm(UserActivateType::class, $ua, array('em' => $em));
		
			if ($request->isMethod('POST')) {
				$form->handleRequest ( $request );
				if ($form->isValid()) {
					$user = $this->em()->getRepository('AppBundle:User')->getUserByActivation($ua->username,$ua->token);
					if ($user != null){
						// everything is OK
						$user->setStatus(1);
						$this->em()->persist($user);
						$this->em()->flush();
						//$this->get('session')->set ( "me_acktivate_valid","" );
						return $this->redirect($this->generateUrl('security_wellcome', array ('_' => 'a' )));
					}else{
						//$this->get('session')->set ( "me_acktivate_valid",$this->p('valid_activate') );
						return $this->redirect($this->generateUrl('security_activate'));
					}
				} else{
					//@TODO Error hanlder write to log and show to user
					//$this->get('session')->set ( "me_acktivate_valid",$form->getErrors() );
				}
			}
			return $this->render ('security/confirm.html.twig', array (
					'form' => $form->createView(),
			) );
		}
	}
	
	
	/**
	 * @Route("resend_aj", name="security_resend_aj")
	 * 
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function resendAction(Request $request) {
		if (! $request->isXmlHttpRequest()) { 
			throw new NotFoundHttpException();
		}
		
		if( $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
			//  authenticated (NON anonymous)
			if ($this->u()->getStatus()===5){
				//further - if user is nicht activated
			}else{
				return new Response($this->p('msg_security_anonymous_resend'),420);;
			}
		}else{
			//further
		}
		
		$u = $request->query->get('u');
		if($u==null || $u==''){
			return new Response(sprintf($this->p('msg_security_username_email_empty_skip'),$u),423);//'Username/Email is empty <'.$u.'>, skip it',423);;
		}
		$user = $this->em()->getRepository('AppBundle:User')->getUserByUE($u);
		
		if (!is_null($user)){
			// everything is OK
			if ($user->getStatus()==1){
				return new Response(sprintf($this->p('msg_security_user_already_acitvated'),$u),421);//'User is already activated <'.$u.'>, nothing todo',421);;
			}
			if ($this->p("notify_off")=="1"){
				//return new Response($this->p('msg_security_mail_send_error'),422);//'It is not possible to send mails at the moment. Try it later',422);
				$request->getSession()->set('user_status_5_resend', '1');
				return new Response('OK',200);
			}else{
				// $subj = $this->r('PlaceHolder')->findOneBy(array('ph'=>'[#mail_subj_user_activate#]'));
				$nm = $this->get('app.notify.manager');
				if (!$nm->send(array(
						'quiz_id'=>$this->p('quiz_id'),
						'to'=>$user->getEmail(),
						'from'=>$this->p('mail_reg_from_adr'),
						'fromn'=>$this->p('mail_reg_from_nam'),
						's'=>'[#mail_subj_user_activate#]',
						'bn'=>'user.activate',
						'bo'=>array('user'=>$user,'r' => '')
				))){
					return new Response('Send: System Error. Contact Admins.',423);
				}else {
					$request->getSession()->set('user_status_5_resend', '1');
					return new Response('OK',200);
				}
			}
		}else{
			return new Response(sprintf($this->p('msg_security_user_not_found'),$u),421);//'User is not found: '.$u,421);;
		}
	}
	
	
	/**
	 * @Route("w", name="security_wellcome") 
	 * 
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function wellcomeAction(Request $request) {
		if( $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
			//  authenticated (NON anonymous)
			return $this->redirect($this->generateUrl('home'));
		}else{
			// $session = $request->getSession ();
			$authenticationUtils = $this->get('security.authentication_utils');
			// get the login error if there is one
			$error = $authenticationUtils->getLastAuthenticationError();
			// last username entered by the user
			$lastUsername = $authenticationUtils->getLastUsername();
			$activate = $this->get('session')->get ( "me_acktivate_ok" );
			return $this->render ('security/wellcome.html.twig', array (
				'last_username' => $lastUsername,
				'error' => $error,
				'activate' => $activate,
			) );
		}
	}
	
	
	/**
	 * @Route("pr", name="password_send_request")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function passwordSendRequestAction(Request $request) {
		$s = $request->getSession ();
		if (! $request->isXmlHttpRequest()) {
			$json=array("e" => 202, "html" => "Request is not a XmlHttpRequest");
			return new JsonResponse($json);
		}
		if (!$this->isGranted('ROLE_SUPER')) {//if super-admin does this, then goes further
			if ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') && $this->u()->getStatus()!==9){
				$json=array("e" => 203, "html" => $this->p('msg_security_non_anonymous_authenticated'));
				return new JsonResponse($json);
			}else{
				//further
			}
		}
		// 07.08.2018, astoian - see below the check $user->getReset
		// if ($s->get('v')=='1'){
		// 	$s->set ( "v", '1');
		// 	$json=array("e" => 220, "html" => $this->p('msg_security_mail_already_sent'));
		// 	return new JsonResponse($json);
		// }
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
			$u = $data['u'];
			// $o = $request->request->get('op1');
			// dump($data);
			if($u==null || $u==''){
				//  no username/email is given
				//'Benutzername/Email ist nicht angegeben' );
				$json=array("e" => 221, "html" => $this->p('msg_security_username_email_empty'));
				return new JsonResponse($json);
			}

			$user = $this->em()->getRepository('AppBundle:User')->getUserByUE($u);
			if ($user !== null){
				if ($user->getReset()!==''){
					$s->set ( "v", '1');
					$json=array("e" => 220, "html" => $this->p('msg_security_mail_already_sent'));
					return new JsonResponse($json);
				}
				// everything is OK
				$user->setReset(Ses::uid ( 128 ));
				if ($this->p("notify_off")=="1"){
					//TODO - Log it for admins
					$json=array("e" => 209, "html" => $this->p('msg_security_mail_deactivated'));
					return new JsonResponse($json);
				}else{
					// $subj = $this->r('PlaceHolder')->findOneBy(array('ph'=>'[#mail_subj_user_password_request#]'));
					$nm = $this->get('app.notify.manager');
					if (!$nm->send(array(
							'quiz_id'=>$this->p('quiz_id'),
							'to'=>$user->getEmail(),
							'from'=>$this->p('mail_reg_from_adr'),
							'fromn'=>$this->p('mail_reg_from_nam'),
							's'=>'[#mail_subj_user_password_request#]',
							'bn'=>'user.password.request',
							'bo'=>array('user' => $user)
					))){
						//mail is not sent
						$json=array("e" => 290, "html" => "Mail is not sent");
						return new JsonResponse($json);
					}else {
						$this->em()->persist($user);
						$this->em()->flush();
						//$s->set ( "v", '1');
						// $s->set ( "m", sprintf($this->p('msg_security_mail_sent'),$u));//'E-Mail ist an angegebene Adresse '.$u.' gesendet');
						// return $this->render ('security/password.ok.html.twig', array () );
						$json=array("e" => 200, "html" => sprintf($this->p('msg_security_mail_sent'),$u));
						return new JsonResponse($json);
					}
				}
			}else{
				//user is not found
				$json=array("e" => 222, "html" => sprintf($this->p('msg_security_user_not_found'),$u));
				return new JsonResponse($json);
			}
		}
		$json=array("e" => 202, "html" => "Nothing is posted");
		return new JsonResponse($json);
	}
	
	/**
	 * @Route("pn", name="password_new")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function passwordNewAction(Request $request) {
		$s = $request->getSession ();
		if( $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
			//  authenticated (NON anonymous)
			$s->set ( "m", $this->p('msg_security_non_anonymous_authenticated'));//'authenticated (NON anonymous)' );
			return $this->render ('security/error.html.twig');
		}else{
			if ($request->isMethod('GET')) {
				//$ua->username=$this->get('session')->get ( "me_acktivate_user");
				if ($request->query->get('_')!==""){
					$reset=$request->query->get('_');
				}else{
					//  no unid for password change
					$s->set ( "m", $this->p('msg_security_token_empty'));//'no unid is given for password change' );
					return $this->render ('security/error.html.twig');
				}
				
				$user = $this->r()->getUserByReset($reset);
				if ($user==null){
					//no such user by reset ID
					$s->set ( "m", sprintf($this->p('msg_security_password_reset_not_found'),$reset));//'Passwort-Reset-Code ist nicht gefunden oder abgelaufen. Wenden Sie sich an Administrator. '.$reset );
					return $this->render ('security/error.html.twig');
				}
				$form = $this->createForm(UserPasswordResetType::class, $user);
				$s->set('_',$reset);
			}else{
				$reset=$s->get ('_');
				//dump($reset);
				$user = $this->r()->getUserByReset($reset);
				//dump($user);
				//dump($this->em()->getClassMetadata(get_class($user))->getName()); 
				$form = $this->createForm(UserPasswordResetType::class, $user);
			}
	
			if ($request->isMethod('POST')) {
				$form->handleRequest ( $request );
				if ($form->isValid()) {
					// everything is OK
					$user->setReset('');
					// Encode the password (you could also do this via Doctrine listener)
					$encoder = $this->container->get('security.password_encoder');
					$password = $encoder->encodePassword($user, $user->getPassword());
					$user->setPassword($password);
					$this->em()->persist($user);
					$this->em()->flush();
					$s->set ( "v", '1');
					$s->set ( "m", $this->p('msg_security_password_saved'));//'Ihre Passwort wurde erfolgreich abgespeichert. Jetzt können Sie sich anmelden.');
					return $this->render ('security/password.ok.html.twig');
				} else{
					//TODO Error hanlder write to log and show to user
					$s->set ( "m",$form->getErrors() );
					return $this->render ('security/error.html.twig');
				}
			}
			return $this->render ('security/password.new.html.twig', array (
					'form' => $form->createView(),
			) );
		}
	}
	
	/**
	 * @Route("pok", name="password_ok")
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function passwordOkAction(Request $request) {
		$s = $request->getSession ();
		if( $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
			//  authenticated (NON anonymous)
			$s->set ( "m", $this->p('msg_security_non_anonymous_authenticated') );
			return $this->render ('security/password.ok.html.twig', array () );
			//return $this->redirect($this->generateUrl('security_error'));
		}else{
			$s->set ( "m",$this->p('msg_security_password_saved'));//"Ihre Passwort wurde erfolgreich abgespeichert. Jetzt können Sie sich anmelden." );
			return $this->render ('security/password.ok.html.twig', array () );
		}
	}
	
	/**
	 * @Route("e", name="security_error")
	 * @Method({"GET"})
	 * @Template("exception/exception_full.html.twig")	
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function securityErrorAction(Request $request) {
		//return array('m' => 'ok?');
	}
	

	/**
	 * @Route("/fbr", name="fbr")
	 * @Method({"GET"})
	 *
	 * @param Request $request
	 * @return Redirect
	 */
	public function fbrAction(Request $request) {
		$redirect = $this->get('session')->get('redirect');
		if (is_null($redirect)  || $redirect===''){
			return $this->redirect ( $this->generateUrl ( 'home') );
		}else{
			return $this->redirect ( $this->generateUrl ( $redirect) );
		}
	}



}

