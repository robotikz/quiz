<?php
// src/AppBundle/Controller/AScreenController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\ScreenResult;
use AppBundle\Form\ScreenResultType;
use AppBundle\Entity\PlaceHolder;
use AppBundle\Entity\EmailHolder;
use AppBundle\Entity\InfoHolder;
use AppBundle\Form\PlaceHolderType;
use AppBundle\Form\EmailHolderType;
use AppBundle\Form\InfoHolderType;
use AppBundle\Entity\ScreenGameover;
use AppBundle\Form\ScreenGameoverType;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Utils\Ses;
use AppBundle\Entity\ScreenHighscore;
use AppBundle\Form\ScreenHighscoreType;
use AppBundle\Entity\ScreenSharee;
use AppBundle\Form\ScreenShareeType;


class AScreenController extends QController {
	
	/**
	 * @Route("admin/screen", name="admin_screen")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function screenAction(Request $request) {
		//*************RIGHTS************************************

		return $this->render ( 'admin/screen.html.twig', array (
				//'screen' => $screen,
		) );
	}
	
	
	/**
	 * @Route("admin/placeholder", name="admin_placeholder")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function placeholdertAction(Request $request) {
		//*************RIGHTS************************************
	
		$placeholders = $this->em()->getRepository('AppBundle:PlaceHolder')->getPlaceHoldersAll();
	
		return $this->render ( 'admin/placeholder.html.twig', array (
				'placeholders' => $placeholders,
		) );
	}
	
	/**
	 * @Route("admin/placeholder/{eid}", name="admin_placeholder_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function placeholderneAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		if ($eid==null || $eid==0){
			$placeholder = new PlaceHolder();
		}else{
			$placeholder = $this->em()->getRepository('AppBundle:PlaceHolder')->find($eid);
		}
		if ($placeholder==null) $placeholder = new PlaceHolder();
	
		$form = $this->createForm ( PlaceHolderType::class, $placeholder );
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//------------------edit placeholder
				//dump($placeholder);
				$this->em()->persist ( $placeholder );
				$this->em()->flush ();
				$this->get('session')->set('admin_placeholder_ok', 'PlaceHolder is OK');
				return $this->redirect ( $this->generateUrl ( 'admin_placeholder') );
				//$placeholders = $this->em()->getRepository('AppBundle:PlaceHolder')->getPlaceHoldersByCountry($coid);
			}
		}
	
		return $this->render ( 'admin/placeholder.ne.html.twig', array (
				'placeholder' => $placeholder,
				'form'=>$form->createView()
		) );
	}
	
	
	/**
	 * @Route("admin/placeholder/-/{eid}", name="admin_placeholder_d", requirements={"eid": "\d+"})
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function placeholderdAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		if ($eid==null || $eid==0){
			$this->get('session')->set('admin_placeholder_ok', 'Nothing is deleted');
		}else{
			$placeholder = $this->em()->getRepository('AppBundle:PlaceHolder')->find($eid);
		}
		if ($placeholder==null) {
			$this->get('session')->set('admin_placeholder_ok', 'Nothing is deleted');
		}else{
			$this->em()->remove($placeholder);
			$this->em()->flush ();
			$this->get('session')->set('admin_placeholder_ok', 'Placeholder deletion is OK');
		}
	
	
		return $this->redirect ( $this->generateUrl ( 'admin_placeholder'));
	
		$placeholders = $this->em()->getRepository('AppBundle:PlaceHolder')->getPlaceHoldersAll();
		return $this->render ( 'admin/placeholder.html.twig', array (
				'placeholders' => $placeholders,
		) );
	}
	

	/**
	 * @Route("admin/emailholder", name="admin_emailholder")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function emailholdertAction(Request $request) {
		//*************RIGHTS************************************
	
		$emailholders = $this->em()->getRepository('AppBundle:EmailHolder')->getEmailHoldersAll();
	
		return $this->render ( 'admin/emailholder.html.twig', array (
				'emailholders' => $emailholders,
		) );
	}

	/**
	 * @Route("admin/emailholder/{eid}", name="admin_emailholder_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function emailholderneAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		if ($eid==null || $eid==0){
			$emailholder = new EmailHolder();
		}else{
			$emailholder = $this->em()->getRepository('AppBundle:EmailHolder')->find($eid);
		}
		if ($emailholder==null) $emailholder = new EmailHolder();
	
		$form = $this->createForm ( EmailHolderType::class, $emailholder );
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//------------------edit emailholder
				//dump($emailholder);
				$this->em()->persist ( $emailholder );
				$this->em()->flush ();
				$this->get('session')->set('admin_emailholder_ok', 'emailHolder is OK');
				return $this->redirect ( $this->generateUrl ( 'admin_emailholder') );
				//$emailholders = $this->em()->getRepository('AppBundle:emailHolder')->getemailHoldersByCountry($coid);
			}
		}
	
		return $this->render ( 'admin/emailholder.ne.html.twig', array (
				'emailholder' => $emailholder,
				'form'=>$form->createView()
		) );
	}
	
	/**
	 * @Route("admin/emailholder/-/{eid}", name="admin_emailholder_d", requirements={"eid": "\d+"})
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function emailholderdAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		if ($eid==null || $eid==0){
			$this->get('session')->set('admin_emailholder_ok', 'Nothing is deleted');
		}else{
			$emailholder = $this->em()->getRepository('AppBundle:EmailHolder')->find($eid);
		}
		if ($emailholder==null) {
			$this->get('session')->set('admin_emailholder_ok', 'Nothing is deleted');
		}else{
			$this->em()->remove($emailholder);
			$this->em()->flush ();
			$this->get('session')->set('admin_emailholder_ok', 'emailholder deletion is OK');
		}
	
		return $this->redirect ( $this->generateUrl ( 'admin_emailholder'));
	
		$emailholders = $this->em()->getRepository('AppBundle:EmailHolder')->getEmailHoldersAll();
		return $this->render ( 'admin/emailholder.html.twig', array (
				'emailholders' => $emailholders,
		) );
	}

	/**
	 * @Route("admin/screen/result", name="admin_screen_result")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function resultAction(Request $request) {
		//*************RIGHTS************************************
	
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
		
		return $this->render ( 'admin/screen.result.html.twig', array (
				'quizs' => $quizs,
		) );
	}
	
	/**
	 * @Route("admin/screen/result/{qid}/{eid}", name="admin_screen_result_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function resultneAction(Request $request,$eid=null,$qid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
		//eid - is always id of Quiz
		//dump($eid);
		if ($eid==null || $eid==0){
			//return $this->redirect ( $this->generateUrl ( 'admin_screen_result') );
			$screenresult = new ScreenResult($this->p('screen_result_title1'),$this->p('screen_result_title2'),$this->p('screen_result_title3'),$this->p('screen_result_title4'));
			$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($qid);
			$screenresult->setQuiz($quiz);
		}else{
			//$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($eid);
			$screenresult = $this->em()->getRepository('AppBundle:ScreenResult')->find($eid);
		}
		
		$form = $this->createForm ( ScreenResultType::class, $screenresult );
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//------------------edit screenresult
				$this->em()->persist ( $screenresult );
				$this->em()->flush ();
				$this->get('session')->set('admin_screen_result_ok', 'Screenresult is OK');
				return $this->redirect ( $this->generateUrl ( 'admin_screen_result_ne',array('qid'=>$screenresult->getQuiz()->getId(),'eid'=>$screenresult->getId(),'_'=>'y')) );
			}
		}
	
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
		return $this->render ( 'admin/screen.result.ne.html.twig', array (
				'screenresult' => $screenresult,
				'form'=>$form->createView(),
				'quizs' => $quizs,
		) );
	}
	
	/**
	 * @Route("admin/screen/gameover", name="admin_screen_gameover")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function gameoverAction(Request $request) {
		//*************RIGHTS************************************
	
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
	
		return $this->render ( 'admin/screen.gameover.html.twig', array (
				'quizs' => $quizs,
		) );
	}
	
	/**
	 * @Route("admin/screen/gameover/{qid}/{eid}", name="admin_screen_gameover_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function gameoverneAction(Request $request,$eid=null,$qid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
		//eid - is always id of Quiz
		//dump($eid);
		if ($eid==null || $eid==0){
			//return $this->redirect ( $this->generateUrl ( 'admin_screen_gameover') );
			$screengameover = new ScreenGameover($this->p('screen_gameover_title1'),$this->p('screen_gameover_title2'),$this->p('screen_gameover_title3'),$this->p('screen_gameover_title4'));
			$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($qid);
			$screengameover->setQuiz($quiz);
		}else{
			//$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($eid);
			$screengameover = $this->em()->getRepository('AppBundle:ScreenGameover')->find($eid);
		}
	
		$form = $this->createForm ( ScreenGameoverType::class, $screengameover );
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//------------------edit screengameover
				
				$p = $request->get ( 'screengameover' );
				//var_dump($p);
				// resize the avatar image to 500x167
				
				//move new created image with id=0 to its real id-folder,  if image is selected
				if ($p ['avatar_has'] != null && $p ['avatar_has'] != '') {
					$avatar=Ses::after('tmp_', $p ['avatar']);
					if ($eid==0){
						$this->em()->persist ( $screengameover );
						$this->em()->flush();
						if (!is_dir(Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()))) {
							mkdir(Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()));
						}
						rename(Ses::getUpDirTmp($this->p('img_path'),'sgo-0') . "/" . $p ['avatar'], Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()) . "/" . $avatar);
					}else{
						rename(Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()) . "/" . $p ['avatar'],
								Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()) . "/" . $avatar);
					}
					$screengameover->setAvatar($avatar);
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
						Ses::imgResize ( Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()) . "/" . $avatar,
								Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()) . "/" . $avatar2,
								$img_constraint );
					}else{//avatar2 - is selected
						$avatar2=Ses::after('tmp_', $p ['avatar2']);
						if ($eid==0){
							rename(Ses::getUpDirTmp($this->p('img_path'),'sgo-0') . "/" . $p ['avatar2'], Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()) . "/" . $avatar2);
						}else{
							rename(Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()) . "/" . $p ['avatar2'],
									Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()) . "/" . $avatar2);
						}
					}
					$screengameover->setAvatar2($avatar2);
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
					Ses::imgResize ( Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()) . "/" . $avatar,
							Ses::getUpDirTmp($this->p('img_path'),'sgo-'.$screengameover->getId()) . "/" . $avatar2,
							$img_constraint );
					$screengameover->setAvatar2($avatar2);
				}
				
				$this->em()->persist ( $screengameover );
				$this->em()->flush ();
				$this->get('session')->set('admin_screen_gameover_ok', 'Screengameover is OK');
				return $this->redirect ( $this->generateUrl ( 'admin_screen_gameover_ne',array('qid'=>$screengameover->getQuiz()->getId(),'eid'=>$screengameover->getId(),'_'=>'y')) );
			}
		}
	
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
		return $this->render ( 'admin/screen.gameover.ne.html.twig', array (
				'screengameover' => $screengameover,
				'form'=>$form->createView(),
				'quizs' => $quizs,
		) );
	}
	
	
	/**
	 *	gameoverAvatarAction
	 * @Route("aj/screen/gameover/avatar", name="aj_screen_gameover_avatar")
	 *
	 * @param
	 *
	 */
	public function gameoverAvatarAction(Request $request) {
		$ret1 = null;
		if (is_object(parent::upFotoAction1($ret1))) return $ret1;
	
		//TODO check username if already exist, then return validation-message, check only by new users
	
		$fd = $request->files->get('screengameover');
		$un = 'sgo-'.$request->get('screengameover_id');
		$ffoto = $fd['avatar_f'];//$request->files->get('user[avatar_f]', array(), true);
		//var_dump($request->get('gameover_id'));
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
					$jerr = "File ist not an image, type is: ".$ffoto->getMimeType();
				}else{
					if ($typ=='admin_avatar')$fn_pref='avatar';
					$fnor = 'tmp_'.$fn_pref.'.'.$ffoto->guessExtension();
					$ffoto->move(Ses::getUpDirTmp($this->p('img_path'),$un), $fnor);
					//TODO Create a scheduled tasks to remove not saved images
					// check if image-path is not saved in DB, if user is offline or only more than 24h -> remove the image
					list($ioW, $ioH) = getimagesize(Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor);
					if ($ioW<$img_min_w){
						$jerr = "Die Bildmaße stimmen nicht. Die Breite ist kleiner als ".$img_min_w."px";
					}else if ($ioH<$img_min_h){
						$jerr = "Die Bildmaße stimmen nicht. Die Höhe ist kleiner als ".$img_min_h."px";
					}else if ($ioH>$img_max_h){
						$jerr = "Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_h."px";
					}else if ($ioW<$img_min_w){
						$jerr = "Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_w."px";
					}
					if ($ioH==$img_min_h && $ioW==$img_min_w && $ioH==$img_max_h && $ioW==$img_max_w){
						$vw='admin/screen.gameover.avatar';
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
						"jerr" => "Die maximale Dateigröße ".($ffoto->getMaxFilesize()/1024/1024)." MB wurde überschritten.",
						'fncl' => $fncl,
						"html" => $content,
						$typ.'id' => $id,
						'fnid' => $ix,
				);
			}
		}else{
			$rjson = array (
					"jcode" => 400,
					"jerr" => "Bilderdatei ist leer",
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
	 * gameoverAvatar2Action
	 * @Route("aj/screen/gameover/avatar2", name="aj_screen_gameover_avatar2")
	 *
	 * @param
	 *
	 */
	public function gameoverAvatar2Action(Request $request) {
		$ret1 = null;
		if (is_object(parent::upFotoAction1($ret1))) return $ret1;
	
		//TODO check username if already exist, then return validation-message, check only by new users
	
		$fd = $request->files->get('screengameover');
		$un = 'sgo-'.$request->get('screengameover_id');
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
					$jerr = "File ist not an image, type is: ".$ffoto->getMimeType();
				}else{
					if ($typ=='admin_avatar')$fn_pref='avatar2';
					$fnor = 'tmp_'.$fn_pref.'.'.$ffoto->guessExtension();
					$ffoto->move(Ses::getUpDirTmp($this->p('img_path'),$un), $fnor);
					//TODO Create a scheduled tasks to remove not saved images
					// check if image-path is not saved in DB, if user is offline or only more than 24h -> remove the image
					list($ioW, $ioH) = getimagesize(Ses::getUpDirTmp($this->p('img_path'),$un)."/".$fnor);
					if ($ioW<$img_min_w){
						$jerr = "Die Bildmaße stimmen nicht. Die Breite ist kleiner als ".$img_min_w."px";
					}else if ($ioH<$img_min_h){
						$jerr = "Die Bildmaße stimmen nicht. Die Höhe ist kleiner als ".$img_min_h."px";
					}else if ($ioH>$img_max_h){
						$jerr = "Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_h."px";
					}else if ($ioW<$img_min_w){
						$jerr = "Die Bildmaße stimmen nicht. Die Höhe ist große als ".$img_max_w."px";
					}
					if ($ioH==$img_min_h && $ioW==$img_min_w && $ioH==$img_max_h && $ioW==$img_max_w){
						$vw='admin/screen.gameover.avatar2';
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
						"jerr" => "Die maximale Dateigröße ".($ffoto->getMaxFilesize()/1024/1024)." MB wurde überschritten.",
						'fncl' => $fncl,
						"html" => $content,
						$typ.'id' => $id,
						'fnid' => $ix,
				);
			}
		}else{
			$rjson = array (
					"jcode" => 400,
					"jerr" => "Bilderdatei ist leer",
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
	 * @Route("admin/screen/highscore", name="admin_screen_highscore")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function highscoreAction(Request $request) {
		//*************RIGHTS************************************
	
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
	
		return $this->render ( 'admin/screen.highscore.html.twig', array (
				'quizs' => $quizs,
		) );
	}
	
	/**
	 * @Route("admin/screen/highscore/{qid}/{eid}", name="admin_screen_highscore_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function highscoreneAction(Request $request,$eid=null,$qid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
		//eid - is always id of Quiz
		//dump($eid);
		if ($eid==null || $eid==0){
			//return $this->redirect ( $this->generateUrl ( 'admin_screen_highscore') );
			$screenhighscore = new ScreenHighscore(
				$this->p('screen_highscore_title1'),
				$this->p('screen_highscore_title4'),
				$this->p('screen_highscore_title5'),
				$this->p('screen_highscore_title6'),
				$this->p('screen_highscore_title7'),
				$this->p('screen_highscore_title8'),
				$this->p('screen_highscore_title9'),
				$this->p('screen_highscore_titlem1'),
				$this->p('screen_highscore_titlem2'),
				$this->p('screen_highscore_titlem3'),
				$this->p('screen_highscore_titlea1'),
				$this->p('screen_highscore_titlea2'),
				$this->p('screen_highscore_titlea3')
				);
			$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($qid);
			$screenhighscore->setQuiz($quiz);
		}else{
			//$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($eid);
			$screenhighscore = $this->em()->getRepository('AppBundle:ScreenHighscore')->find($eid);
		}
	
		$form = $this->createForm ( ScreenHighscoreType::class, $screenhighscore );
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//------------------edit screenhighscore
	
	
				$this->em()->persist ( $screenhighscore );
				$this->em()->flush ();
				$this->get('session')->set('admin_screen_highscore_ok', 'Screenhighscore is OK');
				return $this->redirect ( $this->generateUrl ( 'admin_screen_highscore_ne',array('qid'=>$screenhighscore->getQuiz()->getId(),'eid'=>$screenhighscore->getId(),'_'=>'y')) );
			}
		}
	
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
		return $this->render ( 'admin/screen.highscore.ne.html.twig', array (
				'screenhighscore' => $screenhighscore,
				'form'=>$form->createView(),
				'quizs' => $quizs,
		) );
	}
	
	/**
	 * @Route("admin/screen/sharee", name="admin_screen_sharee")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function shareeAction(Request $request) {
		//*************RIGHTS************************************
	
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
	
		return $this->render ( 'admin/screen.sharee.html.twig', array (
				'quizs' => $quizs,
		) );
	}
	
	/**
	 * @Route("admin/screen/sharee/{qid}/{eid}", name="admin_screen_sharee_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function shareeneAction(Request $request,$eid=null,$qid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
		//eid - is always id of Quiz
		//dump($eid);
		if ($eid==null || $eid==0){
			//return $this->redirect ( $this->generateUrl ( 'admin_screen_sharee') );
			$screensharee = new ScreenSharee($this->p('screen_sharee_title1'),$this->p('screen_sharee_title2'),$this->p('screen_sharee_title3'),$this->p('screen_sharee_title4'),
					$this->p('screen_sharee_title5'));
			$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($qid);
			$screensharee->setQuiz($quiz);
		}else{
			//$quiz = $this->em()->getRepository('AppBundle:Quiz')->find($eid);
			$screensharee = $this->em()->getRepository('AppBundle:ScreenSharee')->find($eid);
		}
	
		$form = $this->createForm ( ScreenShareeType::class, $screensharee );
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//------------------edit screensharee
	
	
				$this->em()->persist ( $screensharee );
				$this->em()->flush ();
				$this->get('session')->set('admin_screen_sharee_ok', 'Screensharee is OK');
				return $this->redirect ( $this->generateUrl ( 'admin_screen_sharee_ne',array('qid'=>$screensharee->getQuiz()->getId(),'eid'=>$screensharee->getId(),'_'=>'y')) );
			}
		}
	
		$quizs = $this->em()->getRepository('AppBundle:Quiz')->findBy(array(), array('title' => 'ASC'));
		return $this->render ( 'admin/screen.sharee.ne.html.twig', array (
				'screensharee' => $screensharee,
				'form'=>$form->createView(),
				'quizs' => $quizs,
		) );
	}


	/**
	 * @Route("admin/infoholder", name="admin_infoholder")
	 * @Security("has_role('ROLE_SUPER')")
	 */
	public function infoholdertAction(Request $request) {
		//*************RIGHTS************************************
	
		$infoholders = $this->em()->getRepository('AppBundle:InfoHolder')->getInfoHoldersAll();
	
		return $this->render ( 'admin/infoholder.html.twig', array (
				'infoholders' => $infoholders,
		) );
	}

	/**
	 * @Route("admin/infoholder/{eid}", name="admin_infoholder_ne")
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function infoholderneAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		if ($eid==null || $eid==0){
			$infoholder = new InfoHolder();
		}else{
			$infoholder = $this->em()->getRepository('AppBundle:InfoHolder')->find($eid);
		}
		if ($infoholder==null) $infoholder = new InfoHolder();
	
		$form = $this->createForm ( InfoHolderType::class, $infoholder );
		if ($request->isMethod ( 'POST' )) {
			$form->handleRequest ( $request );
			if ($form->isValid ()) {
				//------------------edit infoholder
				//dump($infoholder);
				$this->em()->persist ( $infoholder );
				$this->em()->flush ();
				$this->get('session')->set('admin_infoholder_ok', 'infoHolder is OK');
				return $this->redirect ( $this->generateUrl ( 'admin_infoholder') );
				//$infoholders = $this->em()->getRepository('AppBundle:infoHolder')->getinfoHoldersByCountry($coid);
			}
		}
	
		return $this->render ( 'admin/infoholder.ne.html.twig', array (
				'infoholder' => $infoholder,
				'form'=>$form->createView()
		) );
	}
	
	/**
	 * @Route("admin/infoholder/-/{eid}", name="admin_infoholder_d", requirements={"eid": "\d+"})
	 * @Security("has_role('ROLE_ADMIN')")
	 */
	public function infoholderdAction(Request $request,$eid=null) {
		//+++++++++++++++++++++++ADMINS ONLY++++++++++++++++++++++++++++++++++
	
		if ($eid==null || $eid==0){
			$this->get('session')->set('admin_infoholder_ok', 'Nothing is deleted');
		}else{
			$infoholder = $this->em()->getRepository('AppBundle:InfoHolder')->find($eid);
		}
		if ($infoholder==null) {
			$this->get('session')->set('admin_infoholder_ok', 'Nothing is deleted');
		}else{
			$this->em()->remove($infoholder);
			$this->em()->flush ();
			$this->get('session')->set('admin_infoholder_ok', 'infoholder deletion is OK');
		}
	
		return $this->redirect ( $this->generateUrl ( 'admin_infoholder'));
	
		$infoholders = $this->em()->getRepository('AppBundle:InfoHolder')->getInfoHoldersAll();
		return $this->render ( 'admin/infoholder.html.twig', array (
				'infoholders' => $infoholders,
		) );
	}
}