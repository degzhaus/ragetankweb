<?php
namespace RageTank\UserBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class RegistrationResponseType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('comment');
        $builder->add('mobile_apps');
        $builder->add('undesired_features');
        $builder->add('desired_features');
        $builder->add('days_year');
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'RageTank\UserBundle\Entity\RegistrationResponse',
            'cascade_validation' => true
        ));
    }

    public function getName()
    {
        return 'registration_response';
    }
}