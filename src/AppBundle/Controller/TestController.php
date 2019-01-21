<?php
// src/AppBundle/Controller/PageController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Doctrine\ORM\Query\ResultSetMapping;
use AppBundle\Entity\QuestionCat;
use AppBundle\Entity\QuizCat;
use AppBundle\Entity\Question;
use AppBundle\Entity\Answer;
use AppBundle\Utils\Ses;


class TestController extends QController {
	
	/**
	 * @Route("test/user/signup", name="test_user_signup")
	 *
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function userSignupAction() {
		return $this->render ( 'old/user-signup-screen.html.twig', array (
		) );
	}
	
	/**
	 * @Route("test/email/php", name="test_email_php")
	 * 
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function emailPHPAction() {
		
// 		$protocol = "ssl";	//tcp ssl tls
// 		$host = "smtp.1und1.de";
// 		$port = 465; 		//25 465 587
// 		$errno = 1;
// 		$errstr = "";
// 		$timeout = 30;
// 		$socket_context = stream_context_create(array());
		
		//$smtp_conn =
		//stream_socket_client($protocol."://".$host.":".$port, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $socket_context);
		// Verify we connected properly
// 		if(empty($smtp_conn)) {
// 			$error = array('error' => 'Failed to connect to server','errno' => $errno,'errstr' => $errstr);
// 		}
// 		else{
// 			$error = $smtp_conn;
// 		}
// 		var_dump($error);
		
		
		
		//$this->get ( 'mailer' )->send ( $message );
		
		$to = "jankieone@gmail.com";
		$this->get('app.notify.manager')->setP(2);//php
		if (!$this->get('app.notify.manager')->send(array(
				'to'=>$to,
				'from'=>'support@quizpiggy.com',
				's'=>"Willkomen zu QUIZ - TEST-PHP",
				'bn'=>"activate",
				'bo'=>array ('username' => 'jo','token' => '1234567890')
		))){
			$p = 'PHP-Mailer Error: ';// . $m->ErrorInfo;
		} else {
			$p = 'Message has been sent';
		}
		
// 		$headers = "From: " . strip_tags($this->getParameter('mailer_user')) . "\r\n";
// 		$headers .= "Reply-To: ". strip_tags($this->getParameter('mailer_user')) . "\r\n";
// 		//$headers .= "CC: susan@example.com\r\n";
// 		$headers .= "MIME-Version: 1.0\r\n";
// 		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		
// 		$subject = "FAFA TEST EMAIL SEND";
// 		$message = $this->renderView ( 'AppBundle:Email:reg.html.twig', array (
// 				'login' => 'jo',
// 				'token' => '1234567890' 
// 			));
		
// 		mail($to,$subject,$message,$headers);
		
		// return new Response('Is sent! w.sent');
		return $this->render ( 'test/email.html.twig', array (
				'p' => $p 
		) );
	}
	
	/**
	 * @Route("test/email/swift", name="test_email_swift")
	 * 
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function emailSWIFTAction() {
	
		
		$to = "jankieone@gmail.com";
		$this->get('app.notify.manager')->setP(1);//swift
		if (!$this->get('app.notify.manager')->send(array(
				'to'=>$to,
				'from'=>'support@quizpiggy.com', 
				's'=>"Willkomen zu QUIZ - SWIFT-PHP",
				'bn'=>"activate",
				'bo'=>array ('username' => 'jo','token' => '1234567890')
		))){
			$p = 'Swift-Mailer Error: ' ;//. $m->ErrorInfo;
		} else {
			$p = 'Message has been sent';
		}
	
		// return new Response('Is sent! w.sent');
		return $this->render ( 'test/email.html.twig', array (
				'p' => $p
		) );
	}
	
	public function errorAction() {
		$p = "No errors";
		//$t = 3/0;
		throw new \Exception('Ahhhhahahhhah');
		return $this->render ( 'AppBundle:Test:email.html.twig', array (
				'k' => $p
		) );
	}


	/**
	 * @Route("test/import/mario", name="test_import_mario")
	 *
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function testImportMarioAction() {
		//*************RIGHTS************************************
		if (!$this->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
			throw $this->createAccessDeniedException();
		}
		//*************RIGHTS************************************
		$p = "Nothing";

		$default = ini_get('max_execution_time');
		set_time_limit(1000);

		$rsm = new ResultSetMapping();
		$rsm->addScalarResult('id', 'id');
		$rsm->addScalarResult('question', 'question');
		$rsm->addScalarResult('subcategory', 'subcategory');
		$rsm->addScalarResult('rightanswer', 'rightanswer');
		$rsm->addScalarResult('a1', 'a1');
		$rsm->addScalarResult('a2', 'a2');
		$rsm->addScalarResult('a3', 'a3');
		$rsm->addScalarResult('a4', 'a4');
		$rsm->addScalarResult('picture', 'picture');
		
		$qb = $this->em()
		->createNativeQuery('SELECT * FROM quiz_questions',$rsm)
		;
		$qqs = $qb->getResult();
		
		foreach ($qqs as $qq) {

			$title_old = $qq['subcategory'];
			$questioncat = $this->em()->getRepository('AppBundle:QuestionCat')->getQuestionCatByCat($title_old);
			if (true === is_null ($questioncat)){
				$questioncat = new QuestionCat();
				$questioncat->setTitle($title_old);
				//------------------edit questioncat
				if ($questioncat->getQuizcat()==null){
					$quizcat = $this->em()->getRepository('AppBundle:QuizCat')->getQuizCatByCat(strtolower($title_old));
					//dump($quizcat);
					if (true === is_null ($quizcat)){
						$quizcat = new QuizCat();
						$quizcat->setTitle($questioncat->getTitle());
						$quizcat->setQuestioncat($questioncat);
						$questioncat->setQuizcat($quizcat);
						$this->em()->persist ( $quizcat );
					}else{
						$questioncat->setQuizcat($quizcat);
						$quizcat->setQuestioncat($questioncat);
					}
				}else{
					$questioncat->getQuizcat()->setTitle($questioncat->getTitle());
					$questioncat->getQuizcat()->setQuestioncat($questioncat);
				}
				$this->em()->persist ( $questioncat );
				$this->em()->flush();
			}
		}

		//create question + answers
		foreach ($qqs as $qq) {

			//if exist by title, then skip
			$question = $this->em()->getRepository('AppBundle:Question')->findOneBy(array('title'=>$qq['question']));
			if (!is_null ($question)) {
				dump($question);
				continue; 
			}

			//if not then new one
			$question = new Question();
			// $question->setId(0);
			$question->setTitle($qq['question']);
			$question->setTruecount(1);


			//answer - 1
			$answer1 = new Answer();
			$answer1->setTitle($qq['a1']);
			$question->addAnswer($answer1);

			//answer - 2
			$answer2 = new Answer();
			$answer2->setTitle($qq['a2']);
			$question->addAnswer($answer2);

			//answer - 3
			$answer3 = new Answer();
			$answer3->setTitle($qq['a3']);
			$question->addAnswer($answer3);

			//answer - 4
			$answer4 = new Answer();
			$answer4->setTitle($qq['a4']);
			$question->addAnswer($answer4);
			
			switch ($qq['rightanswer']) {
				case 1:
					$answer1->setStatus(1);
					break;
				case 2:
					$answer2->setStatus(1);
					break;
				case 3:
					$answer3->setStatus(1);
					break;
				case 4:
					$answer4->setStatus(1);
					break;
			}

			$questioncat = $this->em()->getRepository('AppBundle:QuestionCat')->getQuestionCatByCat($qq['subcategory']);
			$question->addCat($questioncat);

			$this->em()->persist ( $question );
			$this->em()->persist ( $answer1 );
			$this->em()->persist ( $answer2 );
			$this->em()->persist ( $answer3 );
			$this->em()->persist ( $answer4 );
			$this->em()->flush();

			//picture
			if ($qq['picture']!=''){
				$avatar=Ses::after_last('quiz/', $qq['picture']);
				
				if (!is_dir(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()))) {
					mkdir(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()));
				}
				file_put_contents(Ses::getUpDirTmp($this->p('img_path'),'q-'.$question->getId()) . "/" . $avatar, 
					fopen("http://nintendofans.de/".$qq['picture'], 'r'));
				$question->setAvatar($avatar);
				
				$this->em()->persist ( $question );
				$this->em()->flush();
			}

			// break;
		}

		// $this->em()->flush();
		// dump($qqs);

		set_time_limit($default);
		
		return $this->render ( 'test/temp.html.twig', array (
			'p' => $p,
			'qqs'=>$qqs
	) );
	}
}