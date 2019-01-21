<?php
// src/AppBundle/Repository/ScreenShareeRepository.php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * ScreenShareeRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ScreenShareeRepository extends EntityRepository
{
	public function getScreenShareesAll() {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select ( 'e' )
		->addOrderBy ( 'e.title', 'ASC' )
		;
	
		return $qb->getQuery ()->getResult ();
	}
	
	public function getScreenShareesAllQB() {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select ( 'e' )
		->addOrderBy ( 'e.title', 'ASC' )
		;
	
		return $qb;
	}
	
	
}