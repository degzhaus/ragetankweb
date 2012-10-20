<?php

namespace RageTank\AuthBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template("RageTankAuthBundle:Default:pages/index.html.twig")
     */
    public function indexAction()
    {
        return array();
    }
    
    /**
     * @Route("/sign-up")
     * @Template("RageTankAuthBundle:Default:pages/sign-up.html.twig")
     */
    public function signupAction()
    {
        return array();
    }
}
