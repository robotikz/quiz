<?php
// src/AppBundle/Repository/InfoHolderRepository.php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * InfoHolderRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class InfoHolderRepository extends EntityRepository
{
	public function getInfoHoldersAll() {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select ( 'e' )
		->addOrderBy ( 'e.tn', 'ASC' )
		;
		return $qb->getQuery ()->getResult ();
	}
	
	public function getInfoHoldersAllQB() {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select ( 'e' )
		->addOrderBy ( 'e.tn', 'ASC' )
		;
		return $qb;
	}
	
}