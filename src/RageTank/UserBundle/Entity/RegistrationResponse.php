<?php

namespace RageTank\UserBundle\Entity;

use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="ragetank_registration_response")
 */
class RegistrationResponse
{
    /**
     * @var bigint $id
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var bigint $id
     *
     * @ORM\OneToOne
     * @ORM\Column(type="integer")
     */
    protected $user_id;

    /**
     * @var text $question
     *
     * @ORM\Column(name="comment", type="text", nullable=false)
     */
    private $comment;

    /**
     * @var text $mobile_apps
     *
     * @ORM\Column(name="mobile_apps", type="text", nullable=true)
     */
    private $mobile_apps;

    /**
     * @var text $undesired_features
     *
     * @ORM\Column(name="undesired_features", type="text", nullable=true)
     */
    private $undesired_features;
    
    /**
     * @var text $desired_features
     *
     * @ORM\Column(name="desired_features", type="text", nullable=true)
     */
    private $desired_features;
    
    /**
     * @var text $days_year
     *
     * @ORM\Column(name="days_year", type="text", nullable=true)
     */
    private $days_year;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Question
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return Question
     */
    public function setEmail($email)
    {
        $this->email = $email;
    
        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set comment
     *
     * @param string $comment
     * @return Comment
     */
    public function setComment($comment)
    {
        $this->comment = $comment;
    
        return $this;
    }

    /**
     * Get comment
     *
     * @return string 
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * Set user_id
     *
     * @param integer $userId
     * @return RegistrationResponse
     */
    public function setUserId($userId)
    {
        $this->user_id = $userId;
    
        return $this;
    }

    /**
     * Get user_id
     *
     * @return integer 
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * Set mobile_apps
     *
     * @param string $mobileApps
     * @return RegistrationResponse
     */
    public function setMobileApps($mobileApps)
    {
        $this->mobile_apps = $mobileApps;
    
        return $this;
    }

    /**
     * Get mobile_apps
     *
     * @return string 
     */
    public function getMobileApps()
    {
        return $this->mobile_apps;
    }

    /**
     * Set undesired_features
     *
     * @param string $undesiredFeatures
     * @return RegistrationResponse
     */
    public function setUndesiredFeatures($undesiredFeatures)
    {
        $this->undesired_features = $undesiredFeatures;
    
        return $this;
    }

    /**
     * Get undesired_features
     *
     * @return string 
     */
    public function getUndesiredFeatures()
    {
        return $this->undesired_features;
    }

    /**
     * Set desired_features
     *
     * @param string $desiredFeatures
     * @return RegistrationResponse
     */
    public function setDesiredFeatures($desiredFeatures)
    {
        $this->desired_features = $desiredFeatures;
    
        return $this;
    }

    /**
     * Get desired_features
     *
     * @return string 
     */
    public function getDesiredFeatures()
    {
        return $this->desired_features;
    }

    /**
     * Set days_year
     *
     * @param string $daysYear
     * @return RegistrationResponse
     */
    public function setDaysYear($daysYear)
    {
        $this->days_year = $daysYear;
    
        return $this;
    }

    /**
     * Get days_year
     *
     * @return string 
     */
    public function getDaysYear()
    {
        return $this->days_year;
    }
}