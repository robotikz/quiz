<?php
// src/AppBundle/Security/User/HWIUserProvider.php
namespace AppBundle\Security;

use AppBundle\Entity\User;
use AppBundle\Security;
use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\Exception\AccountNotLinkedException;
use HWI\Bundle\OAuthBundle\Security\Core\User\OAuthUser;
use HWI\Bundle\OAuthBundle\Security\Core\User\OAuthUserProvider;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class HWIUserProvider extends OAuthUserProvider
{
	protected $session, $doctrine, $logger, $router, $tokenstorage;
	public function __construct($session, $doctrine, $logger, $router, $tokenstorage) {
		$this->session = $session;
		$this->doctrine = $doctrine;
		$this->logger = $logger;
		$this->router = $router;	
		$this->tokenstorage = $tokenstorage;
	}
	
	
	/*public function loadUserByUsername($username)
	{
	
		$qb = $this->doctrine->getManager()->createQueryBuilder();
		$qb->select('u')
		->from('AppBundle:User', 'u')
		->where('u.fid = :fid')
		->setParameter('fid', $username)
		;
		$fb_user = $qb->getQuery()->getOneOrNullResult();
	
		// 			if(is_array($fb_user)){
		// 				$user=$fb_user[0];
		// 			}else{
		// 				$user=$fb_user;
		// 			}
		//$id = $fb_user[0]['id'];
		
		if ( is_null($fb_user) ) {
			return new User();
		} else {
			return $fb_user;
		}
	}*/
	

	public function loadUserByOAuthUserResponse(UserResponseInterface $response)
	{
		// dump($response);
		$service = $response->getResourceOwner()->getName();
		//dump($service);
		// if response is null, redirect to an error page
		if ($response->getResponse() == null) {
			throw new \Exception('Couldn\'t retrieve the API response of : '. $service);
		}
		//data from facebook response
		$f_id = $response->getUsername();
		$nickname = $response->getNickname();
		$lastname = $response->getLastName();
		$firstname = $response->getFirstName();
		$email    = $response->getEmail();
		//$avatar   = $response->getProfilePicture();
		//dump("f_id=".$f_id);
		// $this->logger->info("service=".print_r($service,1));
		//set data in session
		$this->session->set('fb_username', preg_replace('/\s+/', '.', strtolower($nickname)));
		$this->session->set('fb_lastname', $lastname);
		$this->session->set('fb_firstname', $firstname);
		$this->session->set('fb_email', $email);
		$this->session->set('fb_fid', $f_id);
		//$this->session->set('avatar', $avatar);
		
		//get user by fid
		$fb_user = $this->doctrine->getManager()->getRepository('AppBundle:User')->findOneBy(array('fid'=>$f_id));
		//go to the registration, if user is not found
		
		if ( is_null($fb_user) ) {
			//dump("security_reg=".$f_id);
			throw new AccountNotLinkedException();
			//$fb_user = new OAuthUser($username);
		} else {
 			$token = new UsernamePasswordToken($fb_user, null, 'socials', $fb_user->getRoles());
 			$this->tokenstorage->setToken($token);
 			$this->session->set('_security_socials', serialize($token));
			//$this->logger->info("fb_user1=".print_r($fb_user,1));
			return $fb_user;
		}
		//return $this->loadUserByUsername($response->getNickname());
		//return new User();
		return $fb_user;
	}
	
	
	public function refreshUser(UserInterface $user)
	{
		// dump("HWIUserProvider");
		// dump("HWI - refresh - ".date("Y-m-d H:i:s"));
		// dump(get_class ($user));
		// dump($this->tokenstorage);
		// dump( ($user));
		// if ($user instanceof User) {
		// 	if ($this->tokenstorage->getToken() != null)
		// 	return $this->tokenstorage->getToken()->getUser();
		// 	// return $user;
		// }

		if (!$this->supportsClass(get_class($user))) {
            throw new UnsupportedUserException(sprintf('Unsupported user class "%s"', get_class($user)));
        }
		
		return $this->loadUserByUsername($user->getUsername());
	}

	public function supportsClass($class)
	{
		return User::class === $class;
	}
}