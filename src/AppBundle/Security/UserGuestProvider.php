<?php
// src/AppBundle/Security/UserGuestProvider.php
namespace AppBundle\Security;

use AppBundle\Security\UserGuest;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;

class UserGuestProvider implements UserProviderInterface
{
    protected $user = null;

    protected $session;
    public function __construct($session)
    {
        $this->session = $session;
        //$this->user = new UserGuest($username, $roles);
    }

    public function loadUserByUsername($username)
    {
        // dump("1-".$username);
        // dump($this->user);
        if (!isset($this->user)) {
			$id = $this->session->get('guest_id');
			if (is_null($id)){
				$id = Ses::rnr(5);
				$this->session->set('guest_id',$id);
			}
		    if (is_null($id) || $id===''){
			    $id=99999;
		    }
            $this->user = new UserGuest($username);
            $this->user->setId($id);
            $this->user->setStatus(9);
            $this->user->setUsername($username);
            $this->user->setPassword('0');
            // $this->user->setEmail('Gast@');
            $this->user->setEmail($username.'@');
            $this->user->setAvatar('avatar.jpg');
            $this->user->setRoles(['ROLE_USER']);
            return $this->user;
        }
        if (!isset($this->user)) {
            throw new UsernameNotFoundException(sprintf('Username "%s" does not exist.', $username));
        }
        // dump("2-".$username);
        return $this-user;
    }

    public function refreshUser(UserInterface $user)
    {
        // dump("UserGuestProvider");
        // dump( ($user));
        if (!$user instanceof UserGuest) {
            throw new UnsupportedUserException(
                sprintf('Instances of "%s" are not supported.', get_class($user))
            );
        }

        return $this->loadUserByUsername($user->getUsername());
    }

    public function supportsClass($class)
    {
        return UserGuest::class === $class;
    }
}