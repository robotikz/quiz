<?php
// src/AppBundle/Entity/Quiz.php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\QuizRepository")
 * @ORM\Table(name="quiz")
 * @ORM\HasLifecycleCallbacks
 */
class Quiz
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
	 * @ORM\Column(type="string", length=50)
	 */
	public $title;
	
	/**
	 * @ORM\Column(type="string", nullable=true, length=20)
	 */
	public $domain;


	/**
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $guestallow = 1;

	/**
	 * legt fest, wie viele Runden pro Tag gespielt werden können: 0 = unbegrenzt; 1 = 1 Runde etc.
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $roundperday = 0;

	/**
	 * wie viele Platzierungen auf der Highscore-Liste zu sehen sind.
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":30})
	 */
	public $hsnumber = 30;

	/**
	 * legt fest, ob nach dem "Game over" eine Auswertung des Ergebnisses erfolgt: 0 = nein; 1 = ja
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":1})
	 */
	public $analysis = 1;
	
	/**
	 * legt fest, ob nach dem "Game over" eine Auswertung induviduell erfolgt: 0 = nein; 1 = ja
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":1})
	 */
	public $analysisi = 1;

	/**
	 * legt fest, ob der Spieler für sein Ergebnis eine Belohnung (Medaille, Trophäe etc.) erhält
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $reward = 0;

	/**
	 * legt fest, ob ein Daten geteilt werden kann: 0 = nein; 1 = ja
	 * 
	 * @ORM\Column(type="smallint", nullable=true, options={"default":1})
	 */
	public $share = 1;

	/**
	 * legt fest, ob ein Highscore geteilt werden kann: 0 = nein; 1 = ja
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $sharehs = 0;

	/**
	 * legt fest, ob die Auswertung geteilt werden kann: 0 = nein; 0 = ja
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $shareanalysis = 0;

	/**
	 * legt fest, ob eine Belohnung geteilt werden kann: 0 = nein; 1 = ja
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $sharereward = 0;

	/**
	 * legt fest, ob Joker für das Quiz aktiviert ist
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":1})
	 */
	public $joker = 1;

	/**
	 * legt fest, ob Joker-Typ "50:50" für das Quiz aktiviert ist
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":1})
	 */
	public $joker5050 = 1;

	/**
	 * legt fest, ob Joker-Typ "Zeit stoppen" für das Quiz aktiviert ist
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":1})
	 */
	public $jokerpause = 1;

	/**
	 * legt fest, ob Joker-Typ "Frage überspringen" für das Quiz aktiviert ist
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":1})
	 */
	public $jokerskip = 1;

	/**
	 * legt fest, ob Fragen der Schwierigkeitsstufe 0 - 9
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $difficulty = 0;

	/**
	 * legt fest, wie viele Sekunden das Zeitlimit andauert 0-kein, 1-n Sekunden
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":15})
	 */
	public $timelimit = 15;

	/**
	 * legt fest, ob die Reihenfolge der gestellten Fragen zufällig ist: 0 = nach Erstelldatum; 1 = Random
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":1})
	 */
	public $qrandom = 1;

	/**
	 * legt fest, ob bereits gestellte Fragen in einer Spielrunde wiederholt werden können
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $qrepeat = 0;

	/**
	 * legt fest, ob Fragen des Frage-Typs "0-Alle", "1-Entscheidungsfragen", "2-Multiple-Choice mit mehreren richtigen Antworten" im Quiz genutzt werden.
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $trueanswer = 0;

	/**
	 * legt fest, ob Werbung anzeigen
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":0})
	 */
	public $ads = 0;

	/**
	 * legt fest, nach X-Fragen anzeigen
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":5})
	 */
	public $adsafterqn = 5;

	/**
	 * legt fest, nach X-Sekunden die Werbung verschwindet
	 *
	 * @ORM\Column(type="smallint", nullable=true, options={"default":10})
	 */
	public $adsaftersec = 10;
	
	/**
	 * Color-1 header
	 *
	 * @ORM\Column(type="text", nullable=true)
	 */
	public $color1;
	
	/**
	 * Color-2 footer
	 *
	 * @ORM\Column(type="text", nullable=true)
	 */
	public $color2;
	
	/**
	 * Color-3 score
	 *
	 * @ORM\Column(type="text", nullable=true)
	 */
	public $color3;
	
	/**
	 * Color-4 answer select
	 *
	 * @ORM\Column(type="text", nullable=true)
	 */
	public $color4;
	
	/**
	 * Color-5 answer wrong
	 *
	 * @ORM\Column(type="text", nullable=true)
	 */
	public $color5;

	/**
	 * Color-6 joker
	 *
	 * @ORM\Column(type="text", nullable=true)
	 */
	public $color6;
	
	
	/**
	 * @ORM\Column(type="string", length=50,nullable=true)
	 */
	public $logo1;
	
	/**
	 * @ORM\Column(type="string", length=50,nullable=true)
	 */
	public $logo2;
	
	/**
	 * @ORM\Column(type="string", length=50,nullable=true)
	 */
	public $background;

	/**
	 * @ORM\Column(type="string", length=50,nullable=true)
	 */
	public $fb1;



	/**
	 * @ORM\ManyToMany(targetEntity="QuizCat", inversedBy="quizs")
	 * @ORM\JoinTable(name="quizs_cats")
	 */
	public $cats;
	
	/**
	 * @ORM\OneToMany(targetEntity="Evaluation", mappedBy="quiz", cascade={"persist", "remove"}, fetch="EXTRA_LAZY")
	 * @ORM\OrderBy({"score" = "ASC", "title" = "ASC"})
	 */
	public $evaluations;
	
	/**
	 * One Quiz has One Screen-Result.
	 * @ORM\OneToOne(targetEntity="ScreenResult", mappedBy="quiz")
	 */
	public $result;
	
	/**
	 * One Quiz has One Screen-Gameover.
	 * @ORM\OneToOne(targetEntity="ScreenGameover", mappedBy="quiz")
	 */
	public $gameover;
	
	/**
	 * One Quiz has One Screen-Highscore.
	 * @ORM\OneToOne(targetEntity="ScreenHighscore", mappedBy="quiz")
	 */
	public $highscore;
	
	/**
	 * One Quiz has One Screen-Share.
	 * @ORM\OneToOne(targetEntity="ScreenSharee", mappedBy="quiz")
	 */
	public $sharee;




	/**
	 * @ORM\Column(type="datetime")
	 */
	public $created;

	/**
	 * @ORM\Column(type="datetime")
	 */
	public $updated;

	public $typ = 'quiz';

	protected $qcount = -1;

	public function __construct()
	{
		$this->id=0;

		$this->cats = new ArrayCollection();
		$this->evaluations = new ArrayCollection();
		$this->setCreated(new \DateTime());
		$this->setUpdated(new \DateTime());
		$this->color1 = "#e45a5a";
		$this->color2 = "#e45a5a";
		$this->color3 = "#e3995a";
		$this->color4 = "#48b648";
		$this->color5 = "#e45a5a";
		$this->color6 = "#368989";
	}


	/**
	 * @ORM\PreUpdate
	 */
	public function setUpdatedValue()
	{
		$this->setUpdated(new \DateTime());
	}

	public function addCat(QuizCat $cat)
	{
		$cat->addQuiz($this); // synchronously updating inverse side
		$this->cats[] = $cat;
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
	public function getTitle() {
		return $this->title;
	}
	public function setTitle($title) {
		$this->title = $title;
		return $this;
	}
	public function getGuestallow() {
		return $this->guestallow;
	}
	public function setGuestallow($guestallow) {
		$this->guestallow = $guestallow;
		return $this;
	}
	public function getRoundperday() {
		return $this->roundperday;
	}
	public function setRoundperday($roundperday) {
		$this->roundperday = $roundperday;
		return $this;
	}
	public function getHsnumber() {
		return $this->hsnumber;
	}
	public function setHsnumber($hsnumber) {
		$this->hsnumber = $hsnumber;
		return $this;
	}
	public function getAnalysis() {
		return $this->analysis;
	}
	public function setAnalysis($analysis) {
		$this->analysis = $analysis;
		return $this;
	}
	public function getReward() {
		return $this->reward;
	}
	public function setReward($reward) {
		$this->reward = $reward;
		return $this;
	}
	public function getSharehs() {
		return $this->sharehs;
	}
	public function setSharehs($sharehs) {
		$this->sharehs = $sharehs;
		return $this;
	}
	public function getShareanalysis() {
		return $this->shareanalysis;
	}
	public function setShareanalysis($shareanalysis) {
		$this->shareanalysis = $shareanalysis;
		return $this;
	}
	public function getSharereward() {
		return $this->sharereward;
	}
	public function setSharereward($sharereward) {
		$this->sharereward = $sharereward;
		return $this;
	}
	public function getJoker5050() {
		return $this->joker5050;
	}
	public function setJoker5050($joker5050) {
		$this->joker5050 = $joker5050;
		return $this;
	}
	public function getJokerpause() {
		return $this->jokerpause;
	}
	public function setJokerpause($jokerpause) {
		$this->jokerpause = $jokerpause;
		return $this;
	}
	public function getJokerskip() {
		return $this->jokerskip;
	}
	public function setJokerskip($jokerskip) {
		$this->jokerskip = $jokerskip;
		return $this;
	}
	public function getDifficulty() {
		return $this->difficulty;
	}
	public function setDifficulty($difficulty) {
		$this->difficulty = $difficulty;
		return $this;
	}
	public function getTimelimit() {
		return $this->timelimit;
	}
	public function setTimelimit($timelimit) {
		$this->timelimit = $timelimit;
		return $this;
	}
	public function getTrueanswer() {
		return $this->trueanswer;
	}
	public function setTrueanswer($trueanswer) {
		$this->trueanswer = $trueanswer;
		return $this;
	}
	public function getAds() {
		return $this->ads;
	}
	public function setAds($ads) {
		$this->ads = $ads;
		return $this;
	}
	public function getAdsafterqn() {
		return $this->adsafterqn;
	}
	public function setAdsafterqn($adsafterqn) {
		$this->adsafterqn = $adsafterqn;
		return $this;
	}
	public function getAdsaftersec() {
		return $this->adsaftersec;
	}
	public function setAdsaftersec($adsaftersec) {
		$this->adsaftersec = $adsaftersec;
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
	public function getCats() {
		return $this->cats;
	}
	public function setCats($cats) {
		$this->cats = $cats;
		return $this;
	}
	public function getShare() {
		return $this->share;
	}
	public function setShare($share) {
		$this->share = $share;
		return $this;
	}
	public function getJoker() {
		return $this->joker;
	}
	public function setJoker($joker) {
		$this->joker = $joker;
		return $this;
	}
	public function getQrandom() {
		return $this->qrandom;
	}
	public function setQrandom($qrandom) {
		$this->qrandom = $qrandom;
		return $this;
	}
	public function getQrepeat() {
		return $this->qrepeat;
	}
	public function setQrepeat($qrepeat) {
		$this->qrepeat = $qrepeat;
		return $this;
	}
	public function getColor1() {
		return $this->color1;
	}
	public function setColor1($color1) {
		$this->color1 = $color1;
		return $this;
	}
	public function getColor2() {
		return $this->color2;
	}
	public function setColor2($color2) {
		$this->color2 = $color2;
		return $this;
	}
	public function getColor3() {
		return $this->color3;
	}
	public function setColor3($color3) {
		$this->color3 = $color3;
		return $this;
	}
	public function getColor4() {
		return $this->color4;
	}
	public function setColor4($color4) {
		$this->color4 = $color4;
		return $this;
	}
	public function getColor5() {
		return $this->color5;
	}
	public function setColor5($color5) {
		$this->color5 = $color5;
		return $this;
	}
	public function getLogo1() {
		return $this->logo1;
	}
	public function setLogo1($logo1) {
		$this->logo1 = $logo1;
		return $this;
	}
	public function getLogo2() {
		return $this->logo2;
	}
	public function setLogo2($logo2) {
		$this->logo2 = $logo2;
		return $this;
	}
	public function getBackground() {
		return $this->background;
	}
	public function setBackground($background) {
		$this->background = $background;
		return $this;
	}
	public function getFb1() {
		return $this->fb1;
	}
	public function setFb1($fb1) {
		$this->fb1 = $fb1;
		return $this;
	}
	public function getDomain() {
		return $this->domain;
	}
	public function setDomain($domain) {
		$this->domain = $domain;
		return $this;
	}
	public function getQcount() {
		//if($this->qcount<0){
			$questions = array();
			foreach ($this->getCats() as $c){
				if (!is_null($c->getQuestioncat()) && !is_null($c->getQuestioncat()->getQuestions())) {
					$questions = array_merge($questions,$c->getQuestioncat()->getQuestions()->toArray());
					//$questions = $questions + $c->getQuestioncat()->getQuestions()->toArray();
				}
			}
			$questions = array_unique($questions);
			//dump($questions);
			$this->qcount=count($questions);
		//}
		return $this->qcount;
	}
	public function setQcount($qcount) {
		$this->qcount = $qcount;
		return $this;
	}
	public function getEvaluations() {
		return $this->evaluations;
	}
	public function setEvaluations($evaluations) {
		$this->evaluations = $evaluations;
		return $this;
	}
	
	
	public function addEvaluation(Evaluation $evaluation)
	{
		$this->evaluations->add($evaluation);
		$evaluation->setQuiz($this);
		return $this;
	}
	
	public function removeEvaluation(Evaluation $evaluation)
	{
		$this->evaluations->removeElement($evaluation);
		$evaluation->setQuiz(null);
		return $this;
	}
	
	public function getResult() {
		return $this->result;
	}
	public function setResult($result) {
		$this->result = $result;
		return $this;
	}
	public function getAnalysisi() {
		return $this->analysisi;
	}
	public function setAnalysisi($analysisi) {
		$this->analysisi = $analysisi;
		return $this;
	}
	public function getGameover() {
		return $this->gameover;
	}
	public function setGameover($gameover) {
		$this->gameover = $gameover;
		return $this;
	}
	public function getHighscore() {
		return $this->highscore;
	}
	public function setHighscore($highscore) {
		$this->highscore = $highscore;
		return $this;
	}
	public function getSharee() {
		return $this->sharee;
	}
	public function setSharee($sharee) {
		$this->sharee = $sharee;
		return $this;
	}
	
	
	
	
	
	
	
	
	
	








}
