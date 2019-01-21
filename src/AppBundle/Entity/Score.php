<?php
// src/AppBundle/Entity/Score.php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ScoreRepository")
 * @ORM\Table(name="score")
 * @ORM\HasLifecycleCallbacks
 */
class Score
{
	/**
	 * @ORM\Id
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	public $id;

	/**
	 * @ORM\ManyToOne(targetEntity="User")
	 * @ORM\JoinColumn(name="user", referencedColumnName="id")
	 */
	public $user;

	/**
	 * @ORM\ManyToOne(targetEntity="Quiz")
	 * @ORM\JoinColumn(name="quiz", referencedColumnName="id")
	 */
	public $quiz;
	
	

	/**
	 * 	 *
	 * @ORM\Column(type="integer", nullable=true, options={"default":0})
	 */
	public $score = 0;
	
	/**
	 * 	 *
	 * @ORM\Column(type="bigint", nullable=true, options={"default":0})
	 */
	public $scoresum = 0;


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
	public $typ = 'score';


	public function __construct()
	{
		$this->id=0;


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
	public function getUser() {
		return $this->user;
	}
	public function setUser($user) {
		$this->user = $user;
		return $this;
	}


	public function __toString()
	{
		return $this->getUser()->getId().'-'.$this->getQuiz()->getId();
	}

	public function getTyp() {
		return $this->typ;
	}
	public function getQuiz() {
		return $this->quiz;
	}
	public function setQuiz($quiz) {
		$this->quiz = $quiz;
		return $this;
	}
	public function getScore() {
		return $this->score;
	}
	public function setScore($score) {
		$this->score = $score;
		return $this;
	}
	public function getScoresum() {
		return $this->scoresum;
	}
	public function setScoresum($scoresum) {
		$this->scoresum = $scoresum;
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
	






}
