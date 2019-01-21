<?php
// src/AppBundle/Repository/ScoremRepository.php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * ScoremRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ScoremRepository extends EntityRepository
{
	public function getScoremsAll() {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select ( 'e' )
		->addOrderBy ( 'e.title', 'ASC' )
		;
	
		return $qb->getQuery ()->getResult ();
	}
	
	public function getScoremsAllQB() {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select ( 'e' )
		->addOrderBy ( 'e.title', 'ASC' )
		;
	
		return $qb;
	}
	
	public function getScoremByQuizAll($qid=null,$limit=null, $sort='DESC') {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('e')
		->where('e.quiz = :quiz')
		->setParameter('quiz', $qid)
		->addOrderBy ( 'e.score', $sort )
		;
		
		if (false === is_null ( $limit ))
			$qb->setMaxResults ( $limit );
	
		return $qb->getQuery ()->getResult ();
	}
	
	public function getScoremByQuizAllCount($qid=null) {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('COUNT(e)')
		->where('e.quiz = :quiz')
		->setParameter('quiz', $qid)
		;
		return $qb->getQuery ()->getSingleScalarResult ();
	}
	
	public function getScoremByQuizAllPos($qid=null, $score) {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('COUNT(e)')
		->where('e.quiz = :quiz')
		->andWhere('e.score >= :score')
		->setParameter('quiz', $qid)
		->setParameter('score', $score)
		;
		return $qb->getQuery ()->getSingleScalarResult ();
	}
	
	public function getScoremByQuizAllMoreScorem($qid=null,$score,$limit=null) {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('e')
		->where('e.quiz = :quiz')
		->andWhere('e.score > :score')
		->setParameter('quiz', $qid)
		->setParameter('score', $score)
		->addOrderBy ( 'e.score', 'DESC' )
		;
	
		if (false === is_null ( $limit ))
			$qb->setMaxResults ( $limit );
	
		return $qb->getQuery ()->getResult ();
	}
	
	public function getScoremByQuizAllLessScorem($qid=null,$score,$limit=null) {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('e')
		->where('e.quiz = :quiz')
		->andWhere('e.score < :score')
		->setParameter('quiz', $qid)
		->setParameter('score', $score)
		->addOrderBy ( 'e.score', 'DESC' )
		;
	
		if (false === is_null ( $limit ))
			$qb->setMaxResults ( $limit );
	
		return $qb->getQuery ()->getResult ();
	}
	
	
	
	
	
	
	public function getScoremByQuizYM($qid=null,$m,$y,$limit=null, $sort='DESC') {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('e')
		->where('e.quiz = :quiz')
		->andWhere('e.m = :m')
		->andWhere('e.y = :y')
		->setParameter('quiz', $qid)
		->setParameter('m', $m)
		->setParameter('y', $y)
		->addOrderBy ( 'e.score', $sort )
		;

		if (false === is_null ( $limit ))
			$qb->setMaxResults ( $limit );
	
		return $qb->getQuery ()->getResult ();
	}

	public function getScoremByUserQuizYM($uid=null,$qid=null,$m,$y) {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('e')
		->where('e.quiz = :quiz')
		->andWhere('e.user = :user')
		->andWhere('e.m = :m')
		->andWhere('e.y = :y')
		->setParameter('user', $uid)
		->setParameter('quiz', $qid)
		->setParameter('m', $m)
		->setParameter('y', $y)
		;
	
		return $qb->getQuery ()->getOneOrNullResult ();
	}
	
	public function getScoremByQuizYMCount($qid=null,$m,$y) {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('COUNT(e)')
		->where('e.quiz = :quiz')
		->andWhere('e.m = :m')
		->andWhere('e.y = :y')
		->setParameter('quiz', $qid)
		->setParameter('m', $m)
		->setParameter('y', $y)
		;
	
		return $qb->getQuery ()->getSingleScalarResult ();
	}
	
	public function getScoremByQuizYMPos($qid=null,$m,$y, $score) {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('COUNT(DISTINCT(e.score))')
		->where('e.quiz = :quiz')
		->andWhere('e.m = :m')
		->andWhere('e.y = :y')
		->andWhere('e.score >= :score')
		->setParameter('quiz', $qid)
		->setParameter('m', $m)
		->setParameter('y', $y)
		->setParameter('score', $score)
		;
	
	
		return $qb->getQuery ()->getSingleScalarResult ();
	}
	
	public function getScoremByQuizYMMoreScore($qid=null,$m,$y,$score,$limit=null) {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('e')
		->where('e.quiz = :quiz')
		->andWhere('e.m = :m')
		->andWhere('e.y = :y')
		->andWhere('e.score > :score')
		->setParameter('quiz', $qid)
		->setParameter('m', $m)
		->setParameter('y', $y)
		->setParameter('score', $score)
		->addOrderBy ( 'e.score', 'ASC' )
		;
	
		if (false === is_null ( $limit ))
			$qb->setMaxResults ( $limit );
	
		return $qb->getQuery ()->getResult ();
	}
	
	public function getScoremByQuizYMLessScore($qid=null,$m,$y,$score,$limit=null) {
	
		$qb = $this->createQueryBuilder ( 'e' )
		->select('e')
		->where('e.quiz = :quiz')
		->andWhere('e.m = :m')
		->andWhere('e.y = :y')
		->andWhere('e.score < :score')
		->setParameter('quiz', $qid)
		->setParameter('m', $m)
		->setParameter('y', $y)
		->setParameter('score', $score)
		->addOrderBy ( 'e.score', 'DESC' )
		;
	
		if (false === is_null ( $limit ))
			$qb->setMaxResults ( $limit );
	
		return $qb->getQuery ()->getResult ();
	}
}