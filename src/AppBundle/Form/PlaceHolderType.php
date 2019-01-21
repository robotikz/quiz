<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class PlaceHolderType extends AbstractType{

	function __construct()
	{
	}

	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$typ = [
				"Text/HTML" => "text",
				"PHP" => "php",
				"Quiz-Objekt" => "quiz",
				"Frage-Objekt" => "question",
				"Benutzer-Objekt" => "user",
				"Ergebniss-Objekt" => "result",
		];
		
		$builder
			   ->add('ph',TextType::class, array('required'=>true))
			   ->add('val',TextType::class, array('required'=>true))
			   ->add('what', ChoiceType::class, array(
			   		'choices' => $typ,
			   		'multiple' => false,
					'expanded' => true,
					'required' => true
			   ))
			   ->add('quiz', EntityType::class, array(
				// query choices from this entity
				'class' => 'AppBundle:Quiz',
				'choice_label' => 'title',
				'multiple' => false,
				'expanded' => false,
				'required'=>false,
			))
			;
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
			'data_class' => 'AppBundle\Entity\PlaceHolder'
		));
	}

	public function getBlockPrefix() {
		return 'placeholder';
	}

	/**
	 * @return string
	 */
}
