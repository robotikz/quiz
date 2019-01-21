<?php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class UserNotiType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('noti1',CheckboxType::class, array('required' => false, 'label'=>' Benachrichtigungen (z. B. bei neuem Rekord)'))
        ->add('noti2',CheckboxType::class, array('required' => false, 'label'=>' Informationen zum Quiz (z. B. bei Updates, Features)'))
        ;
        
        $builder->get('noti1')->addModelTransformer(
            new CallbackTransformer( function ($v) { return $v==1?true:false; },function ($v) { return $v?1:0; }));
        $builder->get('noti2')->addModelTransformer(
        	new CallbackTransformer( function ($v) { return $v==1?true:false; },function ($v) { return $v?1:0; }));
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

}