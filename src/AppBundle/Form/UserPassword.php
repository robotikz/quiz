<?php

namespace AppBundle\Form;

use Symfony\Component\Security\Core\Validator\Constraints as SecurityAssert;

/**
 *
 * @author astk
 *        
 */
class UserPassword {
	
	/**
	 * by change password, to check if actual is correct 
	 * 
     * @SecurityAssert\UserPassword(message = "user.password.old_wrong")
	 */
	public $pwd;
	
	public $password;
	
}