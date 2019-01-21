<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ScreenHighscoreType extends AbstractType{

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
       		->add('titlem1',TextareaType::class, array('required'=>true))
       		->add('titlem2',TextareaType::class, array('required'=>true))
			->add('titlem3',TextareaType::class, array('required'=>true))
       		->add('titlea1',TextareaType::class, array('required'=>true))
			->add('titlea2',TextareaType::class, array('required'=>true))
       		->add('titlea3',TextareaType::class, array('required'=>true))
       		->add('title4',TextareaType::class, array('required'=>true))
       		->add('title5',TextareaType::class, array('required'=>true))
       		->add('title6',TextareaType::class, array('required'=>true))
       		->add('title7',TextareaType::class, array('required'=>true))
       		->add('title8',TextareaType::class, array('required'=>true))
			->add('title9',TextareaType::class, array('required'=>true))
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
            'data_class' => 'AppBundle\Entity\ScreenHighscore'
        ));
    }

    public function getBlockPrefix() {
    	return 'screenhighscore';
    }

    /**
     * @return string
     */
}
