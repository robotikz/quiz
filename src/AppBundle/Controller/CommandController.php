<?php
// src/AppBundle/Controller/CommandController.php
namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Utils\Ses;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CommandController extends QController
{

    /**
     * @Route("/cmd/user/deactivate", name="cmd_user_deactivate")
     * @Method({"GET"})
     * @Security("has_role('ROLE_SUPER')")
     *
     * @param Request $request
     * @return Redirect
     */
    public function cmdUserDeactivateAction(Request $request)
    {
        if (PHP_SAPI !== 'cli') {
            // return new Response("404",404);
            throw new NotFoundHttpException("HTTP/1.0 404 Not Found");
        }
        $dafter = new \DateTime();
        $dafter->setTimestamp(strtotime('- 48  hours'));
        dump($dafter);
        $qb = $this->em()
            ->createQueryBuilder()
            ->select('u')
            ->from('AppBundle:User', 'u')
            ->where('u.created < :dafter')
            ->andWhere('u.status = :status')
            ->setParameter('dafter', $dafter)
            ->setParameter('status', '5')
        ;
        $users = $qb->getQuery()->getResult();
        //$users = $this->em()->getRepository('AppBundle:User')->findBy(array('status'=>'5'));
        dump($users);
        // outputs a message followed by a "\n"
        $output = '</br>';
        foreach ($users as $u) {
            $output .= 'User: -id: ' . $u->getId() . ' -name: ' . $u->getUsername() . ' -created: ' . $u->getCreated()->format('Y-m-d H:i:s') . ' </br> ';
            $u->setStatus(0);
            $this->em()->persist($u);
        }
        $this->em()->flush();
        return new Response(
            '<html><body>Deactivated users: ' . $output . '</body></html>'
        );
    }

    /**
     * @Route("/cmd/user/remove", name="cmd_user_remove")
     * @Method({"GET"})
     * Security("has_role('ROLE_SUPER')")
     *
     * @param Request $request
     * @return Redirect
     */
    public function cmdUserRemoveAction(Request $request)
    {
        if (PHP_SAPI !== 'cli') {
            // return new Response("404",404);
            throw new NotFoundHttpException("HTTP/1.0 404 Not Found");
        }
        $dafter = new \DateTime();
        $dafter->setTimestamp(strtotime('- 96  hours'));

        $qb = $this->em()
            ->createQueryBuilder()
            ->select('u')
            ->from('AppBundle:User', 'u')
            ->where('u.created > :dafter')
            ->andWhere('u.status = :status')
            ->setParameter('dafter', $dafter)
            ->setParameter('status', '0')
        ;
        $users = $qb->getQuery()->getResult();
        //$users = $this->em()->getRepository('AppBundle:User')->findBy(array('status'=>'0'));

        // outputs a message followed by a "\n"
        $output = '';
        foreach ($users as $u) {
            $output .= 'User: -id: ' . $u->getId() . ' -name: ' . $u->getUsername() . ' -created: ' . $u->getCreated()->format('Y-m-d H:i:s') . ' </br> ';
            $questions = $this->em()->getRepository('AppBundle:Question')->findBy(array('user' => $u->getId()));
            foreach ($questions as $question) {
                $question->setUser(null);
            }
            $scores = $this->em()->getRepository('AppBundle:Score')->findBy(array('user' => $u->getId()));
            foreach ($scores as $score) {
                $this->em()->remove($score);
            }
            $scores = $this->em()->getRepository('AppBundle:Scorem')->findBy(array('user' => $u->getId()));
            foreach ($scores as $score) {
                $this->em()->remove($score);
            }
            $this->em()->remove($u);
        }
        $this->em()->flush();
        return new Response(
            '<html><body>Removed users: ' . $output . '</body></html>'
        );
    }

    /**
     * @Route("/cmd/user/remove/dir", name="cmd_user_remove_dir")
     * @Method({"GET"})
     * Security("has_role('ROLE_SUPER')")
     *
     * @param Request $request
     * @return Redirect
     */
    public function cmdUserRemoveDirAction(Request $request)
    {
        if (PHP_SAPI !== 'cli') {
            // return new Response("404",404);
            throw new NotFoundHttpException("HTTP/1.0 404 Not Found");
        }
        $dirs = glob(Ses::getUpDirImg($this->p('img_path')) . '/*', GLOB_ONLYDIR);
        foreach ($dirs as $key => &$dir) {
			$dir = Ses::after_last('/',$dir);
			if (strlen($dir)!=32) unset($dirs[$key]);
        }
        // return new Response(
        //     '<html><body>Removed dirs: ' . implode("<br>", $dirs) . '</body></html>'
		// );
		
		$output = '';
		foreach ($dirs as $dir) {
			$qb = $this->em()
				->createQueryBuilder()
				->select('u')
				->from('AppBundle:User', 'u')
				->where('u.unid = :unid')
				->setParameter('unid', $dir)
			;
			$user = $qb->getQuery()->getOneOrNullResult();
			if (is_null($user)){
				$output .= '<br>'.$dir;
				(new Filesystem)->remove(Ses::getUpDirImg($this->p('img_path')) . '/'.$dir);
			}
			
		}
        return new Response(
            '<html><body>Removed dirs: ' . $output . '</body></html>'
        );
    }

}
