<?php
// src/AppBundle/Command/UserRemoveDirCommand.php
namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use AppBundle\Utils\Ses;

class UserRemoveDirCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
        // the name of the command (the part after "bin/console")
            ->setName('qp:user-remove-dir')

        // the short description shown while running "php bin/console list"
            ->setDescription('User remove users dir.')

        // the full command description shown when running the command with
        // the "--help" option
            ->setHelp('This command remove not exited user-dir after 96 Hours')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $users = $em->getRepository('AppBundle:User')->findAll();
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $output->writeln([
            ((new \DateTime()))->format('Y-m-d H:i:s'),
            'User Remover Dir',
            '<============>',
        ]);

        // outputs a message followed by a "\n"
        //$output->writeln('Whoa!');

        $dirs = glob(Ses::getUpDirImg($this->getContainer()->getParameter('img_path')) . '/*', GLOB_ONLYDIR);
        foreach ($dirs as $key => &$dir) {
			$dir = Ses::after_last('/',$dir);
			if (strlen($dir)!=32) unset($dirs[$key]);
        }
        // return new Response(
        //     '<html><body>Removed dirs: ' . implode("<br>", $dirs) . '</body></html>'
		// );
		foreach ($dirs as $dir) {
			$qb = $em
				->createQueryBuilder()
				->select('u')
				->from('AppBundle:User', 'u')
				->where('u.unid = :unid')
				->setParameter('unid', $dir)
			;
			$user = $qb->getQuery()->getOneOrNullResult();
			if (is_null($user)){
				$output->writeln($dir);
				(new Filesystem)->remove(Ses::getUpDirImg($this->p('img_path')) . '/'.$dir);
			}
			
		}
        $output->writeln('>============<');

        // outputs a message without adding a "\n" at the end of the line
        // $output->write('You are about to ');
        // $output->write('remove a user.');
    }
}
