<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserRegType extends AbstractType{
	
	function __construct()
	{
	}
	
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        
        $builder
			->add('email',EmailType::class, array('attr' => array('maxlength'=>32,)))
			->add('username', TextType::class, array (
					'attr' => array (
							'maxlength' => 16,
							'minlength' => 2,
					)
			))
			->add('password', RepeatedType::class, array(
			    'type' => PasswordType::class,
			    'invalid_message' => 'Die Passwort müssen identisch sein.',
			    'required' => true,
			))  	
			//->add('fid',TextType::class, array('attr' => array('maxlength'=>255,)))
			->add('fname',TextType::class, array('attr' => array('maxlength'=>16,'label'=>'Vorname'),'required'=>false))
			->add('lname',TextType::class, array('attr' => array('maxlength'=>16,'label'=>'Nachname'),'required'=>false))
        ;
            
//             $builder->get('hidename')->addModelTransformer(
//             		new CallbackTransformer( function ($v) { return $v==1?true:false; },function ($v) { return $v?1:0; }));
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver  $resolver) 
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\User'
        ));
    }
    
    public function getBlockPrefix() {
    	return 'user';
    }

    /**
     * @return string
     */
}
