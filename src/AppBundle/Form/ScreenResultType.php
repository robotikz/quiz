<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ScreenResultType extends AbstractType{

	function __construct()
	{
	}

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
    	$status = [
    			"aktiv" => "1",
    			"inaktiv" => "0",
    	];
        $builder
       		->add('title1',TextareaType::class, array(
       				'required'=>true, 
       		))
       		->add('title2',TextareaType::class, array('required'=>true))
       		->add('title3',TextareaType::class, array('required'=>true))
       		->add('title4',TextareaType::class, array('required'=>true))
       		->add('status', ChoiceType::class, array(
       				'choices' => $status,
       				'multiple' => false,
       				'expanded' => true,
       				'required' => true
       		))
			
        ;

    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver  $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\ScreenResult'
        ));
    }

    public function getBlockPrefix() {
    	return 'screenresult';
    }

    /**
     * @return string
     */
}
