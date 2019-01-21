<?php

// src/AppBundle/Twig/AppExtension.php
namespace AppBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Routing\Router;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\PlaceHolder;
use Symfony\Component\HttpFoundation\Session\Session;
use AppBundle\Utils\Ses;

class AppExtension extends \Twig_Extension implements \Twig_Extension_GlobalsInterface
{
	
	protected $em;
	protected $cnt;
	protected $router;
	protected $session;
	
	public function __construct(ObjectManager $em, ContainerInterface $cnt, Router $router, Session $session)
	{
		$this->em = $em;
		$this->cnt = $cnt;
		$this->router = $router;
		$this->session = $session;
	}
	
	public function getFilters()
	{
		return array(
				new \Twig_SimpleFilter('abc', array($this, 'abcFilter')),
				new \Twig_SimpleFilter('ph', array($this, 'phFilter')),
				new \Twig_SimpleFilter('pha', array($this, 'phaFilter')),
				new \Twig_SimpleFilter('clr', array($this, 'colorAdjust')),
		);
	}

	public function getGlobals()
	{
		$quiz_id = $this->cnt->getParameter('quiz_id');
		$quiz=null;
		if (is_null($quiz_id)  || $quiz_id===''){
			$quiz = $this->em->getRepository('AppBundle:Quiz')->createQueryBuilder('e')->setMaxResults( 1 )->orderBy('e.created', 'DESC')->getQuery()->getOneOrNullResult();
		}else{
			//$quiz = $this->em->getRepository('AppBundle:Quiz')->findOneBy(array('id'=>$quiz_id));
			$quiz = $this->em->getRepository('AppBundle:Quiz')->find($quiz_id);
// 			$quiz = $this->em->getRepository('AppBundle:Quiz')->createQueryBuilder('e')->setMaxResults( 1 )
// 			->where('e.id = :')->setParameter ( 'ph', '[#'.$ph.'#]' )->orderBy('e.created', 'DESC')->getQuery()->getOneOrNullResult();
		}
		return array(
				'quiz' => $quiz,
		);
	}
	
	
	/**
	 * Convert i-number to letter + ucase|lcase
	 * 
	 * @param unknown $i
	 * @param string $lu
	 * @return string
	 */
	public function abcFilter($i,$lu = 'u')
	{
		$abc = ''.chr(64 + $i);
		if ($lu=='u'){
			$abc = strtoupper($abc);
		}else if ($lu=='l'){
			$abc = strtolower($abc);
		}

		return $abc;
	}
	
	/**
	 * replace defined placehoders to its values
	 *
	 * @param unknown $p1 - quiz, question, user - objects
	 * @param $p1 - quiz || question || user || any
	 * @return string
	 */
	public function phFilter($s, $p1=null)
	{
		$ss  = $s;
		
		$phs = $this->getPHs($ss, '[#', '#]');
		
		foreach ($phs as $ph){
			$placeholders = $this->em->createQueryBuilder('e')
			->select('e')
			->from('AppBundle:PlaceHolder', 'e')
			->where('e.ph = :ph')
			->andWhere('e.quiz IS NOT NULL')//check if placehoder belongs to quiz
			->setParameter ( 'ph', '[#'.$ph.'#]' )
			->getQuery()->getResult()
			;
			//if placeholder which belongs to quiz is not found, then search without
			if (count($placeholders) == 0) {
				$placeholder = $this->em->createQueryBuilder('e')
				->select('e')
				->from('AppBundle:PlaceHolder', 'e')
				->where('e.ph = :ph')
				->setParameter ( 'ph', '[#'.$ph.'#]' )
				->getQuery()->getOneOrNullResult()
				;
			}else{//else search by quiz_id
				$placeholder = $this->em->createQueryBuilder('e')
				->select('e')
				->from('AppBundle:PlaceHolder', 'e')
				->where('e.ph = :ph')
				->andWhere('e.quiz = :quiz')
				->setParameter ( 'ph', '[#'.$ph.'#]' )
				->setParameter ( 'quiz', $this->cnt->getParameter('quiz_id') )
				->getQuery()->getOneOrNullResult()
				;
			}
			//13.06.2018, astoian - if by id is not found, then back to without id
			if (is_null($placeholder)){		
				$placeholder = $this->em->createQueryBuilder('e')
				->select('e')
				->from('AppBundle:PlaceHolder', 'e')
				->where('e.ph = :ph')
				->andWhere('e.quiz IS NULL')//check if placehoder belongs to quiz
				->setParameter ( 'ph', '[#'.$ph.'#]' )
				->getQuery()->getOneOrNullResult()
				;
			}
			if (!is_null($placeholder)){		
				if ($placeholder->getWhat()=="text"){
					$ss = str_replace($placeholder->getPh(), $placeholder->getVal(), $ss);
				}elseif ($placeholder->getWhat()=="php"){
					$val = ""; 
					$val = eval('return '.$placeholder->getVal().';');
					$ss = str_replace($placeholder->getPh(), $val, $ss);
				}elseif ($p1!=null && ($placeholder->getWhat()=="quiz" || $placeholder->getWhat()=="question" )){
					$val = "";
					$val = eval('return '.$placeholder->getVal().';');
					$ss = str_replace($placeholder->getPh(), $val, $ss);
				}elseif ($p1!=null && $placeholder->getWhat()=="user"){
					$val = "";
					$val = eval('return '.$placeholder->getVal().';');
					$ss = str_replace($placeholder->getPh(), $val, $ss);
				}
			}
		}
		return $ss;
	}

	

	/**
	 * replace defined placehoders to links <a>
	 *
	 * @param unknown $s - [#link_terms:Nutzungsbedingungen#] path + title
	 * @return string
	 */
	public function phaFilter($s)
	{
		$ss  = $s;
		
		$phs = $this->getPHs($ss, '[#', '#]');
		
		foreach ($phs as $ph){
			// $path = Ses::before(':',$ph);
			// $title = Ses::after(':',$ph);
			//$v = '<a target="blank" href="'.$url.'">'.$title.'</a>';
			$v = '<a ';
			$a = explode(':',$ph);
			$path = $a[0];
			$title = $a[1];
			$id='';$class='';
			if (count($a)>2)
				$id = $a[2];
			if (count($a)>3)
				$class = $a[3];
			if ($path!=''){
				$url = $this->router->generate($path);
				$v.=' target="blank" href="'.$url.'"';
			}
			if($id!='')
				$v.=' id="'.$id.'"';
			if($class!='')
				$v.=' class="'.$class.'"';
			$v.='>'.$title.'</a>';
			$ss = str_replace('[#'.$ph.'#]', $v, $ss);
		}
		return $ss;
	}


	/**
	 * adjust colors
	 *
	 * @param $s - hex color
	 * @param $step - color adjust from 0-255, negative = darker, positive = lighter
	 * @return string
	 */
	public function colorAdjust($hex, $steps) {
		// Steps should be between -255 and 255. Negative = darker, positive = lighter
		$steps = max(-255, min(255, $steps));
		// Normalize into a six character long hex string
		$hex = str_replace('#', '', $hex);
		if (strlen($hex) == 3) {
			$hex = str_repeat(substr($hex,0,1), 2).str_repeat(substr($hex,1,1), 2).str_repeat(substr($hex,2,1), 2);
		}
		// Split into three parts: R, G and B
		$color_parts = str_split($hex, 2);
		$return = '#';
		foreach ($color_parts as $color) {
			$color   = hexdec($color); // Convert to decimal
			$color   = max(0,min(255,$color + $steps)); // Adjust color
			$return .= str_pad(dechex($color), 2, '0', STR_PAD_LEFT); // Make two char hex code
		}
		return $return;
	}

	public function getName()
	{
		return 'app_extension';
	}
	
	/**
	 * @param unknown $str
	 * @param unknown $startDelimiter
	 * @param unknown $endDelimiter
	 * @return string[]
	 */
	protected function getPHs($str, $startDelimiter, $endDelimiter) {
		$contents = array();
		$startDelimiterLength = strlen($startDelimiter);
		$endDelimiterLength = strlen($endDelimiter);
		$startFrom = $contentStart = $contentEnd = 0;
		while (false !== ($contentStart = strpos($str, $startDelimiter, $startFrom))) {
			$contentStart += $startDelimiterLength;
			$contentEnd = strpos($str, $endDelimiter, $contentStart);
			if (false === $contentEnd) {
				break;
			}
			$contents[] = substr($str, $contentStart, $contentEnd - $contentStart);
			$startFrom = $contentEnd + $endDelimiterLength;
		}
	
		return $contents;
	}
}
