<?php
// src/AppBundle/Repository/ScreenHighscoreRepository.php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * ScreenHighscoreRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ScreenHighscoreRepository extends EntityRepository
{
	public function getScreenHighscoresAll() {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select ( 'e' )
		->addOrderBy ( 'e.title', 'ASC' )
		;
	
		return $qb->getQuery ()->getResult ();
	}
	
	public function getScreenHighscoresAllQB() {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select ( 'e' )
		->addOrderBy ( 'e.title', 'ASC' )
		;
	
		return $qb;
	}
	
	
}