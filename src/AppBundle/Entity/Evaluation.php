<?php
// src/AppBundle/Entity/Evaluation.php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EvaluationRepository")
 * @ORM\Table(name="evaluation")
 * @ORM\HasLifecycleCallbacks
 */
class Evaluation
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;
    
    /**
     * @ORM\Column(type="integer")
     */
    public $score;
    
    /**
     * @ORM\Column(type="string", length=255)
     */
    public $title;
    
    /**
     * @ORM\Column(type="smallint", nullable=true, options={"default":1})
     */
    public $status = 1;
    
    
    /**
     * @ORM\ManyToOne(targetEntity="Quiz", inversedBy="evaluations")
     * @ORM\JoinColumn(name="quiz", referencedColumnName="id")
     */
    public $quiz;
    
    
    /**
     * @ORM\Column(type="datetime")
     */
    public $created;
    
    /**
     * @ORM\Column(type="datetime")
     */
    public $updated;
    
    public $typ = 'evaluation';
    
    
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
	public function getTitle() {
		return $this->title;
	}
	public function setTitle($title) {
		$this->title = $title;
		return $this;
	}
	public function getStatus() {
		return $this->status;
	}
	public function setStatus($status) {
		$this->status = $status;
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
	
	
	public function __toString(){
		return $this->title;
	}

    
}
