<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserMyType extends AbstractType{
	
	
	function __construct()
	{
	}
	
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
    	$sexs = [
    			 "user.sex1" => "1" ,
    			 "user.sex2" => "2",
    			 "user.sex3" => "0"
    			];
//     	->add('username',TextType::class, array('attr' => array('maxlength'=>16,)))
//     	->add('email',EmailType::class, array('attr' => array('maxlength'=>64,)))
//     	->add('password',PasswordType::class, array('attr' => array('maxlength'=>16,)))
        $builder
        	->add('username',TextType::class, array('attr' => array('maxlength'=>16,)))
        	->add('email',EmailType::class, array('attr' => array('maxlength'=>64,)))
       		->add('fname',TextType::class, array('attr' => array('maxlength'=>16,'label'=>'Vorname'),'required'=>false))
       		->add('lname',TextType::class, array('attr' => array('maxlength'=>16,'label'=>'Nachname'),'required'=>false))
			->add('sex', ChoiceType::class, array(
					'choices' => $sexs,
					'multiple' => false,
					'expanded' => false,
					'required' => true
			))
            ->add('avatar_f',FileType::class,array('required'=>false,'mapped' => false,'attr' => array('accept'=>'.jpg,.jpe,.jpeg,.png,.gif')))
            ->add('avatar',TextType::class, array('required'=>false))
            ->add('avatar_x', TextType::class, array('required'=>false,'mapped' => false))
            ->add('avatar_y', TextType::class, array('required'=>false,'mapped' => false))
            ->add('avatar_h', TextType::class, array('required'=>false,'mapped' => false))
            ->add('avatar_w', TextType::class, array('required'=>false,'mapped' => false))
            // ->add('unid', TextType::class, array('required'=>false))
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
