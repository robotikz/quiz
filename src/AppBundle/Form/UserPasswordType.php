<?php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class UserPasswordType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('pwd', PasswordType::class, array('attr' => array('maxlength'=>25,'minlength'=>3)), array('required' => true))
        ->add('password', RepeatedType::class, array(
        		'type' => PasswordType::class,
        		'invalid_message' => 'Wiederholende Passwort darf nich leer sein.',
        		'first_name'  => 'pass1',
        		'second_name' => 'pass2',
                'required' => true,
                'attr' => array('maxlength'=>25,'minlength'=>3)
        ))
        ;
    }

/**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver  $resolver) 
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Form\UserPassword'
        ));
    }
    
    public function getBlockPrefix() {
    	return 'user';
    }

}