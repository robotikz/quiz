<?php
// src/AppBundle/Command/UserRemoveCommand.php
namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class UserRemoveCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
        // the name of the command (the part after "bin/console")
        ->setName('qp:user-remove')

        // the short description shown while running "php bin/console list"
            ->setDescription('User remove inactive users.')

        // the full command description shown when running the command with
        // the "--help" option
            ->setHelp('This command remove inactive user after 96 Hours')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $users = $em->getRepository('AppBundle:User')->findAll();
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $output->writeln([
            ((new \DateTime()))->format('Y-m-d H:i:s'),
            'User Remover',
            '<============>',
        ]);

        // outputs a message followed by a "\n"
        //$output->writeln('Whoa!');

        $dafter = new \DateTime();
        $dafter->setTimestamp(strtotime('- 96  hours'));

        $qb = $em
            ->createQueryBuilder()
            ->select('u')
            ->from('AppBundle:User', 'u')
            ->where('u.created < :dafter')
            ->andWhere('u.status = :status')
            ->setParameter('dafter', $dafter)
            ->setParameter('status', '0')
        ;
        $users = $qb->getQuery()->getResult();
        //$users = $em->getRepository('AppBundle:User')->findBy(array('status'=>'0'));

        // outputs a message followed by a "\n"
        foreach ($users as $u) {
            $output->writeln('User: -id: ' . $u->getId() . ' -name: ' . $u->getUsername() . ' -created: ' . $u->getCreated()->format('Y-m-d H:i:s') . '  ');
            $questions = $em->getRepository('AppBundle:Question')->findBy(array('user' => $u->getId()));
            foreach ($questions as $question) {
                $question->setUser(null);
            }
            $scores = $em->getRepository('AppBundle:Score')->findBy(array('user' => $u->getId()));
            foreach ($scores as $score) {
                $em->remove($score);
            }
            $scores = $em->getRepository('AppBundle:Scorem')->findBy(array('user' => $u->getId()));
            foreach ($scores as $score) {
                $em->remove($score);
            }
            $em->remove($u);
        }
        $em->flush();
        $output->writeln('>============<');

        // outputs a message without adding a "\n" at the end of the line
        // $output->write('You are about to ');
        // $output->write('remove a user.');
    }
}
