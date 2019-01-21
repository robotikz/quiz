<?php
// src/AppBundle/Entity/EmailHolder.php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EmailHolderRepository")
 * @ORM\Table(name="emailholder")
 * @ORM\HasLifecycleCallbacks
 */
class EmailHolder
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
    public $tn;
    
    /**
     * @ORM\Column(type="text")
     */
    public $val;
    
    
    /**
     * @ORM\Column(type="datetime")
     */
    public $created;
    
    /**
     * @ORM\Column(type="datetime")
     */
    public $updated;
    
    public $typ = 'emailholder';
    
    
    public function __construct()
    {
    	$this->id=0;
    	// $this->tn="[##]";
    	
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
		return $this->tn;
	}
	public function getTn() {
		return $this->tn;
	}
	public function setTn($tn) {
		$this->tn = $tn;
		return $this;
	}
	public function getVal() {
		return $this->val;
	}
	public function setVal($val) {
		$this->val = $val;
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
