<?php
// src/AppBundle/Entity/ScreenHighscore.php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ScreenHighscoreRepository")
 * @ORM\Table(name="screenhighscore")
 * @ORM\HasLifecycleCallbacks
 */
class ScreenHighscore
{
	/**
	 * @ORM\Id
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	public $id;

	
	/**
	 * @ORM\OneToOne(targetEntity="Quiz", inversedBy="highscore")
	 */
	protected $quiz;

	/**
	 * Überschrift
	 *
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title1;

	/**
	 * User-Ranking monatlich - weinger
	 * 
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $titlem1;
	
	/**
	 * User-Ranking monatlich - gleich
	 * 
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $titlem2;

	/**
	 * User-Ranking monatlich - mehr
	 * 
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $titlem3;
	
	/**
	 * User-Ranking gesamte Zeit - weniger
	 * 
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $titlea1;

	/**
	 * User-Ranking gesamte Zeit - gleich
	 * 
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $titlea2;

	/**
	 * User-Ranking gesamte Zeit - mehr
	 * 
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $titlea3;
	
	/**
	 * Text auf Button "Platzierung"
	 * 
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title4;

	/**
	 * Text auf Button "Mehr laden"
	 *
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title5;
	
	/**
	 * Text, wenn nicht eingeloggt
	 *
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title6;
	
	/**
	 * Text auf Button "Einloggen"
	 *
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title7;
	
	/**
	 * Text auf Button, wenn eingeloggt
	 *
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title8;

	/**
	 * Text noch nicht gepielt
	 *
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title9;
	
	/**
	 * 0 = aktiv, nicht geprüft; 1 = aktiv, geprüft;
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $status = 1;


	

	/**
	 * @ORM\Column(type="datetime")
	 */
	public $created;

	/**
	 * @ORM\Column(type="datetime")
	 */
	public $updated;


	/**
	 * @var string
	 */
	public $typ = 'sreenhighscore';



	public function __construct(
		$t1="",$t4="",$t5="",$t6="",$t7="",$t8="",$t9="",
		$tm1="",$tm2="",$tm3="",$ta1="",$ta2="",$ta3="")
	{
		$this->id=0;
		$this->title1=$t1;
		$this->title4=$t4;
		$this->title5=$t5;
		$this->title6=$t6;
		$this->title7=$t7;
		$this->title8=$t8;
		$this->title9=$t9;

		$this->titlem1=$tm1;
		$this->titlem2=$tm2;
		$this->titlem3=$tm3;
		$this->titlea1=$ta1;
		$this->titlea2=$ta2;
		$this->titlea3=$ta3;


		$this->setCreated(new \DateTime());
		$this->setUpdated(new \DateTime());
	}


	/**
	 * @ORM\PreUpdate
	 */
	public function setUpdatedValue()
	{
		$this->setUpdated(new \DateTime());
	}


	public function getId() {
		return $this->id;
	}
	public function setId($id) {
		$this->id = $id;
		return $this;
	}


	
	public function getTyp() {
		return $this->typ;
	}

	
	
	public function getStatus() {
		return $this->status;
	}
	public function setStatus($status) {
		$this->status = $status;
		return $this;
	}
	public function getQuiz() {
		return $this->quiz;
	}
	public function setQuiz($quiz) {
		$this->quiz = $quiz;
		return $this;
	}
	public function getTitle1() {
		return $this->title1;
	}
	public function setTitle1($title1) {
		$this->title1 = $title1;
		return $this;
	}
	public function getCreated() {
		return $this->created;
	}
	public function setCreated($created) {
		$this->created = $created;
		return $this;
	}
	public function getUpdated() {
		return $this->updated;
	}
	public function setUpdated($updated) {
		$this->updated = $updated;
		return $this;
	}
	public function getTitle4() {
		return $this->title4;
	}
	public function setTitle4($title4) {
		$this->title4 = $title4;
		return $this;
	}
	public function getTitle5() {
		return $this->title5;
	}
	public function setTitle5($title5) {
		$this->title5 = $title5;
		return $this;
	}
	public function getTitle6() {
		return $this->title6;
	}
	public function setTitle6($title6) {
		$this->title6 = $title6;
		return $this;
	}
	public function getTitle7() {
		return $this->title7;
	}
	public function setTitle7($title7) {
		$this->title7 = $title7;
		return $this;
	}
	public function getTitle8() {
		return $this->title8;
	}
	public function setTitle8($title8) {
		$this->title8 = $title8;
		return $this;
	}
	

	
	
	



}
