<?php

namespace RageTank\AuthBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use RageTank\AuthBundle\Entity\Question;

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
    
    /**
     * @Route("/ask")
     */
    public function askAction()
    {
        $request  = $this->get('request');
        $em       = $this->getDoctrine()->getEntityManager();
        $logger   = $this->get('logger');

        $params = array(
            'name'     => $request->request->get('name'),
            'email'    => $request->request->get('email'),
            'question' => $request->request->get('question')
        );
        $question = new Question();
        $question->setName($params['name']);
        $question->setEmail($params['email']);
        $question->setQuestion($params['question']);
        $em->persist($question);
        $em->flush();
        $params['question_id'] = $question->getId();
        $response = array(
            'status' => 'success',
            'data'   => $params
        );
        return new Response(json_encode($response));
    }
    
}
