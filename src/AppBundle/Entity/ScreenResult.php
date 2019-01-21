<?php
// src/AppBundle/Entity/ScreenResult.php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ScreenResultRepository")
 * @ORM\Table(name="screenresult")
 * @ORM\HasLifecycleCallbacks
 */
class ScreenResult
{
	/**
	 * @ORM\Id
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	public $id;

	
	/**
	 * @ORM\OneToOne(targetEntity="Quiz", inversedBy="result")
	 */
	protected $quiz;

	/**
	 * Überschrift
	 *
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title1;

	/**
	 * Überschrift Punktzahl
	 * 
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title2;

	
	/**
	 * Text Punktzahl
	 *
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title3;
	
	/**
	 * Überschrift Auswertung
	 *
	 * @ORM\Column(type="string",nullable=true)
	 */
	public $title4;
	
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
	public $typ = 'sreenresult';



	public function __construct($t1="",$t2="",$t3="",$t4="")
	{
		$this->id=0;
		$this->title1=$t1;
		$this->title2=$t2;
		$this->title3=$t3;
		$this->title4=$t4;
	
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
	public function getTitle2() {
		return $this->title2;
	}
	public function setTitle2($title2) {
		$this->title2 = $title2;
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
	public function getTitle3() {
		return $this->title3;
	}
	public function setTitle3($title3) {
		$this->title3 = $title3;
		return $this;
	}
	public function getTitle4() {
		return $this->title4;
	}
	public function setTitle4($title4) {
		$this->title4 = $title4;
		return $this;
	}
	
	
	



}
