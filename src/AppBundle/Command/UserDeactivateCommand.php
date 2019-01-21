<?php
// src/AppBundle/Command/UserDeactivateCommand.php
namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class UserDeactivateCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
        // the name of the command (the part after "bin/console")
        ->setName('qp:user-deactivate')

        // the short description shown while running "php bin/console list"
            ->setDescription('User deactivate not confirmed users.')

        // the full command description shown when running the command with
        // the "--help" option
            ->setHelp('This command deactivate not confirmed user after 48 Hours')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $users = $em->getRepository('AppBundle:User')->findAll();
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $output->writeln([
            ((new \DateTime()))->format('Y-m-d H:i:s'),
            'User Deactivator',
            '<============>',
        ]);

        $dafter = new \DateTime();
        $dafter->setTimestamp(strtotime('- 48  hours'));
        //dump($dafter);
        $qb = $em
            ->createQueryBuilder()
            ->select('u')
            ->from('AppBundle:User', 'u')
            ->where('u.created < :dafter')
            ->andWhere('u.status = :status')
            ->setParameter('dafter', $dafter)
            ->setParameter('status', '5')
        ;
        $users = $qb->getQuery()->getResult();
        //$users = $em->getRepository('AppBundle:User')->findBy(array('status'=>'5'));
        // dump($users);
        // outputs a message followed by a "\n"
        //$output->writeln('');
        foreach ($users as $u) {
            $output->writeln('User: -id: ' . $u->getId() . ' -name: ' . $u->getUsername() . ' -deactivated: ' . $u->getCreated()->format('Y-m-d H:i:s') . ' ');
            $u->setStatus(0);
            $em->persist($u);
        }
        $em->flush();
        $output->writeln('>============<');
    }
}
