<?php

namespace AppBundle\Notify;


use Symfony\Component\Templating\EngineInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Twig\Environment;
use AppBundle\Notify;

/**
 *
 * @author astk
 *        
 */
class NotifyManager {
	protected $mailer;
	
	// protected $templating;
	protected $twig;

	protected $em;
	
	protected $p=1;
	
	public function __construct(\Swift_Mailer $mailer,Environment $twig, ObjectManager $em, $p) {
		$this->mailer = $mailer;
		// $this->templating = $templating;
		$this->twig = $twig;
		$this->em = $em;
		$this->p=$p;
	}
	
	public function send($m) {
		switch ($this->p){
			case 1:
				$message = \Swift_Message::newInstance ();
				break;
			case 2:
				$message = PHPNotify::newInstance ();
				$message->CharSet = 'UTF-8';
				break;
		}
		$tdb = $this->em->getRepository('AppBundle:EmailHolder')->findOneBy(array('tn'=>$m['bn'],'quiz'=>$m['quiz_id']));
		if (is_null($tdb)){
			$tdb = $this->em->getRepository('AppBundle:EmailHolder')->findOneBy(array('tn'=>$m['bn']));
		}
		$sdb = $this->em->getRepository('AppBundle:PlaceHolder')->findOneBy(array('ph'=>$m['s'],'quiz'=>$m['quiz_id']));
		if (is_null($sdb)){
			$sdb = $this->em->getRepository('AppBundle:PlaceHolder')->findOneBy(array('ph'=>$m['s']));
		}
		// dump($m['bo']);
		$template = $this->twig->createTemplate($tdb->getVal());
		//$template = $this->get('twig')->createTemplate($tdb->getVal());
		//$template->render($m['bo']);
		$message
		->setSubject ($sdb->getVal() )
		->setFrom ( $m['from'], isset($m['fromn'])?$m['fromn']:'' )
		->setTo ( $m['to'] )
		->setBody($template->render($m['bo']),'text/html' );
		//->setBody ( $this->templating->render ( 'email/'.$m['bn'].'.html.twig', $m['bo']), 'text/html' );
		switch ($this->p) {
			case 1 :
				return $this->mailer->send ( $message );
				break;
			case 2 :
				return $message->send();
				break;
		}
		return false;
	}
	
	public function setP($p) {
		$this->p = $p;
		return $this;
	}
	
	
}