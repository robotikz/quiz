<?php
// src/AppBundle/Entity/PlaceHolder.php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PlaceHolderRepository")
 * @ORM\Table(name="placeholder")
 * @ORM\HasLifecycleCallbacks
 */
class PlaceHolder
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
	public $id;
	
	/**
	 * @ORM\ManyToOne(targetEntity="Quiz")
	 * @ORM\JoinColumn(name="quiz", referencedColumnName="id")
	 */
	public $quiz;
    
    /**
     * @ORM\Column(type="string", length=50)
     */
    public $ph;
    
    /**
     * @ORM\Column(type="text")
     */
    public $val;
    
    /**
     * @ORM\Column(type="string", length=20)
     */
    public $what;
    
    
    /**
     * @ORM\Column(type="datetime")
     */
    public $created;
    
    /**
     * @ORM\Column(type="datetime")
     */
    public $updated;
    
    public $typ = 'placeholder';
    
    
    public function __construct()
    {
    	$this->id=0;
    	$this->ph="[##]";
    	
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
	
	public function getQuiz() {
		return $this->quiz;
	}
	public function setQuiz($quiz) {
		$this->quiz = $quiz;
		return $this;
	}
	
	public function __toString(){
		return $this->ph;
	}
	public function getPh() {
		return $this->ph;
	}
	public function setPh($ph) {
		$this->ph = $ph;
		return $this;
	}
	public function getVal() {
		return $this->val;
	}
	public function setVal($val) {
		$this->val = $val;
		return $this;
	}
	public function getWhat() {
		return $this->what;
	}
	public function setWhat($what) {
		$this->what = $what;
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
