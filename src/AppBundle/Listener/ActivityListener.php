<?php
// src/AppBundle/Listener/ActivityListener.php
namespace AppBundle\Listener;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage; 
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\HttpKernel;
use AppBundle\Entity\User;

 
/**
 * Listener that updates the last activity of the authenticated user
 */
class ActivityListener
{
    protected $tokenStorage;
    protected $entityManager;

    public function __construct(TokenStorage $tokenStorage, EntityManager $entityManager)
    {
        $this->tokenStorage = $tokenStorage;
        $this->entityManager = $entityManager;
    }

    /**
    * Update the user "lastAct" on each request
    * @param FilterControllerEvent $event
    */
    public function onCoreController(FilterControllerEvent $event)
    {
        // Check that the current request is a "MASTER_REQUEST"
        // Ignore any sub-request
        if ($event->getRequestType() !== HttpKernel::MASTER_REQUEST) {
                return;
        }

        // Check token authentication availability
        if ($this->tokenStorage->getToken()) { 
            $user = $this->tokenStorage->getToken()->getUser();

            if ( ($user instanceof User) && !($user->isActiveNow()) ) {
                $user->setLastAct(new \DateTime());
                $this->entityManager->flush($user);
            }
        }
    }
}