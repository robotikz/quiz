<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class InfoHolderType extends AbstractType{

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
			   ->add('tn',TextType::class, array('required'=>true))
			   ->add('val',TextareaType::class, array('required'=>true))
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

	}

	/**
	 * @param OptionsResolver $resolver
	 */
	public function configureOptions(OptionsResolver  $resolver)
	{
		$resolver->setDefaults(array(
			'data_class' => 'AppBundle\Entity\InfoHolder'
		));
	}

	public function getBlockPrefix() {
		return 'infoholder';
	}

	/**
	 * @return string
	 */
}
