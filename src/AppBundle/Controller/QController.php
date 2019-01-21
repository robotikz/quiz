<?php
// src/AppBundle/Controller/CarLogController.php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Security\UserGuest;
use AppBundle\Utils\Ses;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\BrowserKit\Cookie;
use Exception;

/**
 * CarLog controller.
 */
class QController extends Controller{

	/** @var User */
	protected $u = null;
	/**
	 * @return User
	 */
	protected function u(){
		//if ($this->u==null) $this->getUserCurr(null);
		//return $this-u;
		return $this->getUserCurr(null);
	}

	protected $feImages =  array('image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp');

	private $em = null;
	/**
	 * @return \Doctrine\ORM\EntityManager
	 */
	protected function em(){
		//if ($this->em==null) $this->em = $this->getDoctrine()->getManager();
		$this->em = $this->getDoctrine()->getManager();
		return $this->em;
	}

	/**
	 * @param string $t
	 * @return \Doctrine\ORM\EntityRepository
	 */
	protected function r($t='User'){
		return $this->em()->getRepository('AppBundle:'.$t);
	}


	/**
	 * @param string $n name of the parameter
	 * @return string
	 */
	protected function p($n='',$v=null, $r=null){
		try {
			if (! is_null ( $r )) {//$this->container->get('request_stack')->getCurrentRequest();
				if (! is_null ( $v )) {
					$s = $r->getSession ();
					$s->set ( $n, $v );
				} else {
					$s = $r->getSession ();
					$ret = $s->get ( $n );
					if (! is_null ( $ret )) return $ret;
				}
			}
			return $this->getParameter($n);
		} catch (Exception $e) {return '';}
	}


	/**
	 * @param - $username if null then current user, if not then search by username
	 * @return unknown
	 */
	protected function getUserCurr($username = null) {
		if (is_null($username)){
		   if ($this->u != null) return $this->u;

			if( $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')){
					//|| $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_REMEMBERED') ){
				$this->u = $this->getUser();//$this->get('security.token_storage')->getToken()->getUser();
			}

			/*if( !$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_REMEMBERED') ){
				$this->u = null;
			}else{
				$this->u = $this->getUser();//get('security.token_storage')->getToken()->getUser();
			}*/
			return $this->u;
		}

		//$em = $this->getDoctrine ()->getManager ();
		$this->u = $this->r()->getUserByUsername($username);

		if (!$this->u) {
			throw $this->createNotFoundException ( sprintf($this->p('msg_q_user_not_found_by_username'),$username) );//'Unable to find User by username: '.$username );
		}

		return $this->u;
	}
	
	protected function setGuest($id=null,Request $request){
		// $session = $request->getSession();
		if (is_null($id)){
			$id = $this->get('session')->get('guest_id');
			if (is_null($id)){
				$id = Ses::rnr(5);// $this->em()->getRepository('AppBundle:User')->getUserLastId();
				$this->get('session')->set('guest_id',$id);
			}
		}
		if (is_null($id) || $id===''){
			$id=99999;
		}
		$user_name_guest = $this->ph('user_name_guest');
		$user = new UserGuest();
		$user->setId($id);
		$user->setStatus(9);
		//$user->setUsername('Gast_'.++$id);
		$user->setUsername($user_name_guest);
		$user->setPassword('0');
		//$user->setEmail('Gast_'.$id.'@');
		$user->setEmail($user_name_guest.'@gast.gast');
		$user->setAvatar('avatar.jpg');
		$user->setRoles(['ROLE_USER']);
		//create role
		// $ur = $this->em()->getRepository('AppBundle:UserRole')->findOneBy(array('role'=>'ROLE_USER'));//new UserRole();
		// $user->addUserRole($ur);
		//copy avatar.jpg to user folder
		if (!file_exists(Ses::getUpDirTmp($this->p('img_path'),$user->getUsername()).'/')) {
			mkdir(Ses::getUpDirTmp($this->p('img_path'),$user->getUsername()).'/', 0777, true);
		}
		if (file_exists(Ses::getUpDirImg($this->p('img_path')).'/avatar.jpg')) {
			copy(Ses::getUpDirImg($this->p('img_path')).'/avatar.jpg', Ses::getUpDirTmp($this->p('img_path'),$user->getUsername()).'/avatar.jpg');
		}

			// 			$this->em()->persist($user);
		// 			$this->em()->flush();
		// $request = $this->get('request_stack')->getMasterRequest();
		//dump($user);
		//login as Guest automatically
		$token = new UsernamePasswordToken($user, null, 'guest', $user->getRoles());
		// if (!$request->hasPreviousSession()) {
		// 	$request->setSession($session);
		// 	$request->getSession()->start();
		// 	$request->cookies->set($request->getSession()->getName(), $request->getSession()->getId());
		// }
		// $token->setAuthenticated(true);
		$this->get('security.token_storage')->setToken($token);
		$this->get('session')->set('_security_'.'guest', serialize($token));
		//$this->get('session')->save();
		// dump("setGuest - ".date("Y-m-d H:i:s"));
		// Fire the login event
        // Logging the user in above the way we do it doesn't do this automatically
        // $event = new InteractiveLoginEvent($request, $token);
    	// $this->get("event_dispatcher")->dispatch("security.interactive_login", $event);
		// $this->get('session')->save();
	}
	


	/**
	 *	upFotoAction1
	 *
	 * @param
	 *
	 */
	public function upFotoAction1(&$ret1) {
		//*************RIGHTS************************************
//     	if( !$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
//     		return $ret1 = new JsonResponse(
//     				array ("jcode" => 400,"jerr" => 'Sie sind nicht angemeldet',	"html" => '','fnid' => 0),
//     				200,
//     				array('Content-Type'=>'application/json')
//     		);
//     	}
		//*************RIGHTS************************************

		//$this->getUserCurr ( null );
		//code in child class function
		return true;
	}

	/**
	 *	upFotoAction2
	 *
	 * @param
	 * TODO - save only one size!
	 *
	 */
	public function upFotoAction2($id = null, $ix, $ffoto, $typ, $img_min_w=null,$img_min_h=null,$img_p_sm=null,$img_p_big=null,$un='',$img_max_w=null,$img_max_h=null) {

		//code in child class function first

		$fncl='';
		$fnor='';
		$content = '';
		/* @var UploadedFile */
		if ($ffoto != null){
			$fncl	= $ffoto->getClientOriginalName();
			$jerr = "ok";
			//FIXME - check max-size, if too big, than resize it
			if ($ffoto->getSize()>0){
				if(!in_array($ffoto->getMimeType(),$this->feImages) ) {
					$jerr = sprintf($this->p('msg_img_file_no_img'),$ffoto->getMimeType());//"File ist not an image, type is: ".$ffoto->getMimeType();
				}else{
					//$fn_uid = "".($typ=='user'?$typsub:$typ);//Ses::uid(8);
					//$fn_pref 	= $fn_uid.'-'.$this->u()->getId().'-'.$id.'-'.$ix;
					//$fn_uid = "".Ses::uid(10);
					//$fn_pref 	= "".($typ=='user'?$typsub:$typ).'-'.$fn_uid.'-'.$ix;
					if ($typ=='admin_avatar')$fn_pref='avatar';
					//elseif ($typ=='comyblog')$typ='ComyBlog';
					$fnor 		= 'tmp_'.$fn_pref.'.'.$ffoto->guessExtension();
					//if dimensions-settings are not defined, than use standard for all
					$img_p_sm = $img_p_sm==null ? array('constraint' => array('width' => 100, 'height' => 100)) : $img_p_sm;
					$img_p_big = $img_p_big==null ? array(	'constraint' => array('width' => 200, 'height' => 200)) : $img_p_big;
					$img_min_w = $img_min_w==null ? 100 : $img_min_w;
					$img_min_h = $img_min_h==null ? 100 : $img_min_h;
					$ffoto->move(Ses::getUpDirTmp($this->p('img_path'),$un), $fnor);
					//TODO Create a scheduled tasks to remove not saved images
					// check if image-path is not saved in DB, if user is offline or onliny more than 24h -> remove the image
					list($ioW, $ioH) = getimagesize(Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor);
					if ($ioW<$img_min_w){
						$jerr = sprintf($this->p('msg_img_width_too_small'),$img_min_w);//"Die Bildmaße stimmen nicht. Die Breite ist kleiner als ".$img_min_w."px";
					}else if ($ioH<$img_min_h){
						$jerr = sprintf($this->p('msg_img_height_too_small'),$img_min_h);//"Die Bildmaße stimmen nicht. Die Höhe ist kleiner als ".$img_min_h."px";
					} 
					if ($img_max_w!=null && $img_max_h!=null){
						if ($ioH>$img_max_h){
							$jerr = sprintf($this->p('msg_img_height_too_big'),$img_max_h);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_h."px";
						}else if ($ioW<$img_min_w){
							$jerr = sprintf($this->p('msg_img_width_too_big'),$img_max_w);//"Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_w."px";
						}
					}
					
					if ($ioH>=$img_min_h && $ioW>=$img_min_w){
//     					if (!Ses::imgResize(Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor, Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor, $img_p_sm)){
//     						$jerr = "Die Bildgrosse ist nicht angepasst zu ".$img_p_sm['constraint']['width']."x".$img_p_sm['constraint']['height'];
//     					};
						if ($typ=='admin_avatar')$vw='admin/avatar';
						//elseif ($typ=='comyblog')$typ='ComyBlog';
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

		return $rjson;
	}

	/**
	 * upFotoAction3
	 *
	 * @param
	 *
	 */
	public function upFotoAction3($request, $typ) {
		//TODO Move this code to entity with Pre/Pos-update
		$ap = $request->request->get(''.$typ);
		if (is_null($ap))return true;
		if (key_exists ( "fotos", $ap )) {
			foreach ( $ap ['fotos'] as $p ) {
				// crop & resize the foto image
				if ($p ['foto_fnbig'] != null && $p ['foto_fnbig'] != '') {
					$img_p_sm = array (
							'constraint' => array (
									'width' => 120,
									'height' => 68
							)
					);
					// $logger->error('upload...'.print_r($p['foto_y'],1));
					Ses::imgCrop ( Ses::getUpDirTmp($this->p('img_path'),$this->u()->getUsername()) . "/" . $p ['foto_fnbig'], $p ['foto_x'], $p ['foto_y'], $p ['foto_w'], $p ['foto_h'] );
					Ses::imgResize ( Ses::getUpDirTmp($this->p('img_path'),$this->u()->getUsername()) . "/" . $p ['foto_fnbig'], Ses::getUpDirTmp($this->p('img_path'),$this->u()->getUsername()) . "/" . $p ['foto_fnsm'], $img_p_sm );
				}
			}
		}
		return true;
	}




	/**
	 * @Route("user/is", name="admin_user_is")
	 *
	 * @param Request $request
	 * @throws NotFoundHttpException
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 */
	public function userIsAction(Request $request){
		//*************RIGHTS************************************
		// 		if( !$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY') ){
		// 			return $this->redirect ( $this->generateUrl ( 'login_route') );
		// 		}
		//*************RIGHTS************************************
		if (! $request->isXmlHttpRequest()) {
			throw new NotFoundHttpException();
		}
		$enty=null;
		$ret = '';//[];
		$err = "";
		$up = $request->query->get('user');//Structure is: array(1) { ["user"]=> array(1) { ["username"]=> string(1) "b" } }
		$new = $up[key( $up )];
		//var_dump(key( $up ) . '---' . $new);
		//init current user
		//
		switch (key( $up )){
			case "username":
				$enty = $this->em()->getRepository ( 'AppBundle:User' )->getUserByUsername( $new );
				$err = $this->p('msg_q_user_username_taken');
				break;
			case "email":
				$enty = $this->em()->getRepository ( 'AppBundle:User' )->getUserByEmail( $new );
				$err = $this->p('msg_q_user_email_taken');
				break;
			default:
				$enty = $this->em()->getRepository ( 'AppBundle:User' )->getUserByActivation ( $new );
				$err = $this->p('msg_q_user_user_taken');
				break;
		}

		if ($enty) {
			$ret = $err;//array('jerr'=>$err);
			return new JsonResponse($ret,419);
		}else{
			$ret = 'OK';//array('jerr'=>"OK");
			return new JsonResponse($ret,200);
		}

	}

	/**
	 * get quiz last
	 *
	 * @return void
	 */
	protected function ql(){
		$quiz_id = $this->p('quiz_id');
		if ($quiz_id==null  || $quiz_id==''){
			$quiz = $this->em()->getRepository('AppBundle:Quiz')->createQueryBuilder('e')->setMaxResults( 1 )->orderBy('e.created', 'DESC')->getQuery()->getOneOrNullResult();
			$this->get('session')->set('quiz_id', $quiz->getId());
		}else{
			$quiz = $this->r('Quiz')->findOneBy(array('id'=>$quiz_id));
		}
		return $quiz;
	}

	/**
	 * replace defined placehoders to its values
	 *
	 * @param  $ph - placeholder name
	 * @param $p1 - quiz || question || user || any
	 * @return string
	 */
	protected function ph($ph, $p1=null){
		$ss  = $ph;
		$placeholder = null;
		
		$placeholders = $this->em()->createQueryBuilder('e')
		->select('e')
		->from('AppBundle:PlaceHolder', 'e')
		->where('e.ph = :ph')
		->andWhere('e.quiz IS NOT NULL')//check if placehoder belongs to quiz
		->setParameter ( 'ph', '[#'.$ph.'#]' )
		->getQuery()->getResult()
		;
		//else search by quiz_id
		if (count($placeholders) > 0) {
			$placeholder = $this->em()->createQueryBuilder('e')
			->select('e')
			->from('AppBundle:PlaceHolder', 'e')
			->where('e.ph = :ph')
			->andWhere('e.quiz = :quiz')
			->setParameter ( 'ph', '[#'.$ph.'#]' )
			->setParameter ( 'quiz', $this->p('quiz_id') )
			->getQuery()->getOneOrNullResult()
			;
		}
		//if placeholder  is not found which belongs to quiz, then search without
		if (is_null($placeholder)) {
			$placeholder = $this->em()->createQueryBuilder('e')
			->select('e')
			->from('AppBundle:PlaceHolder', 'e')
			->where('e.ph = :ph')
			->andWhere('e.quiz IS NULL')//check if placehoder belongs to quiz
			->setParameter ( 'ph', '[#'.$ph.'#]' )
			->setMaxResults(1)
			->getQuery()->getOneOrNullResult()
			;
		}
		//dump($placeholder);
		if (!is_null($placeholder)){		
			if ($placeholder->getWhat()=="text"){
				$ss = $placeholder->getVal();
			}elseif ($placeholder->getWhat()=="php"){
				$val = ""; 
				$ss = eval('return '.$placeholder->getVal().';');
			}elseif ($p1!=null && ($placeholder->getWhat()=="quiz" || $placeholder->getWhat()=="question" )){
				$val = "";
				$ss = eval('return '.$placeholder->getVal().';');
			}elseif ($p1!=null && $placeholder->getWhat()=="user"){
				$val = "";
				$ss = eval('return '.$placeholder->getVal().';'); 
			}
		}
		return $ss;
	}


	/**
	 * get success response from recaptcha and return it to controller
	 *
	 * @param [type] $recaptcha
	 * @return void
	 */ 
    protected function captchaverify($recaptcha){
		// $url = $this->p('g_recaptcha_url');
		
		// $ch = curl_init();
		// curl_setopt($ch, CURLOPT_URL, $url);
		// curl_setopt($ch, CURLOPT_HEADER, 0);
		// curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
		// curl_setopt($ch, CURLOPT_POST, true);
		// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		// curl_setopt($ch, CURLOPT_POSTFIELDS, array(
		// 	"secret"=>$this->p('g_recaptcha_secret'),"response"=>$recaptcha));
		// $response = curl_exec($ch);
		// curl_close($ch);
		// $data = json_decode($response);     
		
		// //var_dump($response);
		// if(!isset($data->success)) return false;

		// return $data->success;        
	}

	/**
	 * get success response from recaptcha and return it to controller
	 *
	 * @param [type] $recaptcha
	 * @return void
	 */
	protected function grecaptcha($recaptcha){
		try {
			$postdata = http_build_query(["secret"=>$this->p('g_recaptcha_secret'),"response"=>$recaptcha]);
			$opts = ['http' =>
				[
					'method'  => 'POST',
					'header'  => 'Content-type: application/x-www-form-urlencoded',
					'content' => $postdata
				]
			];
			$context  = stream_context_create($opts);
			$result = file_get_contents($this->p('g_recaptcha_url'), false, $context);
			$check = json_decode($result,true);
			// var_dump($result);
			if(!isset($check['success'])) {
				return array("success" => false, "error-codes" => "999");
			}
			return $check;
		} catch (Exception $e) {
			return array("exception"=>"1","success" => false, "error-codes" => $e->getMessage());
		}
	}



}






/**
 *
 */
