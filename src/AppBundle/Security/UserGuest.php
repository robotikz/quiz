<?php
// src/AppBundle/Security/UserGuest.php
namespace AppBundle\Security;

use AppBundle\Utils\Ses;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\EquatableInterface;
/**
 */
class UserGuest implements UserInterface, EquatableInterface, \Serializable {
	/**
	 */
	protected $id;
	

	/**
	 */
	protected $unid;

	/**
	 */
	protected $username;

	/**
	 */
	protected $password;

	/**
	 */
	protected $reset;


	/**
	 */
	protected $email;

	/**
	 */
	protected $status = 1;

	/**
	 */
	protected $fname;

	/**
	 */
	protected $lname;

	/**
	 */
	protected $sex;

	/**
	 */
	protected $avatar;
	
	/**
	 */
	protected $roles;

	/**
	 *
	 * @var string
	 */
	public $typ = 'userguest';


	public function __construct($username='', array $roles=[]) {
		$this->id=0;
		$this->username = $username;
        // $this->password = $password;
        $this->roles = $roles;
		$this->setUnid ( Ses::uid ( 32 ) );
	}


	/**
	 * @inheritDoc
	 */
	public function getUsername() {
		return $this->username;
	}

	/**
	 * @inheritDoc
	 */
	public function getSalt() {
		// you *may* need a real salt depending on your encoder
		// see section on salt below
		return null;
	}

	/**
	 * @inheritDoc
	 */
	public function getPassword() {
		return $this->password;
	}

	public function setRoles($roles) {
		$this->roles = $roles;
		return $this;
	}
	/**
	 */
	public function getRoles()
	{
		return $this->roles;
	}

	/**
	 * @inheritDoc
	 */
	public function eraseCredentials() {
	}
	public function isAccountNonExpired() {
		return true;
	}
	public function isAccountNonLocked() {
		return true;
	}
	public function isCredentialsNonExpired() {
		return true;
	}
	public function isEnabled() {
		return $this->status == 1; // && (time()-(60*60*48)) < $this->getCreated();
	}

	public function isEqualTo(UserInterface $user)
    {
        if (!$user instanceof UserGuest) {
            return false;
        }

        if ($this->id !== $user->getId()) {
            return false;
        }

		if ($this->username !== $user->getUsername()) {
            return false;
        }

        // if ($this->salt !== $user->getSalt()) {
        //     return false;
        // }

        return true;
    }

	/**
	 *
	 * @see \Serializable::serialize()
	 */
	public function serialize() {
		return serialize ( array (
				$this->id,
				$this->username,
				$this->email,
				$this->password,
				$this->status
		) );
	}

	/**
	 *
	 * @see \Serializable::unserialize()
	 */
	public function unserialize($serialized) {
		list ( $this->id, $this->username, $this->email, $this->password, $this->status, ) = unserialize ( $serialized );
	}
	public function getId() {
		return $this->id;
	}
	public function setId($id) {
		$this->id = $id;
		return $this;
	}
	public function getUnid() {
		return $this->unid;
	}
	public function setUnid($unid) {
		$this->unid = $unid;
		return $this;
	}
	public function setUsername($username) {
		$this->username = $username;
		return $this;
	}
	public function setPassword($password) {
		$this->password = $password;
		return $this;
	}
	public function getEmail() {
		return $this->email;
	}
	public function setEmail($email) {
		$this->email = $email;
		return $this;
	}
	public function getStatus() {
		return $this->status;
	}
	public function setStatus($status) {
		$this->status = $status;
		return $this;
	}
	public function getFname() {
		return $this->fname;
	}
	public function setFname($fname) {
		$this->fname = $fname;
		return $this;
	}
	public function getLname() {
		return $this->lname;
	}
	public function setLname($lname) {
		$this->lname = $lname;
		return $this;
	}
	public function getSex() {
		return $this->sex;
	}
	public function setSex($sex) {
		$this->sex = $sex;
		return $this;
	}
	public function getAvatar() {
		return $this->avatar;
	}
	public function setAvatar($avatar) {
		$this->avatar = $avatar;
		return $this;
	}
	public function getTyp() {
		return $this->typ;
	}


}
