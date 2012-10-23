<?php

namespace RageTank\UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use RageTank\UserBundle\Entity\Question;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template("RageTankUserBundle:Default:pages/index.html.twig")
     */
    public function indexAction()
    {
        return array();
    }
    
    /**
     * @Route("/sign-up")
     * @Template("RageTankUserBundle:Default:pages/sign-up.html.twig")
     */
    public function signupAction()
    {
        return array();
    }
    
    /**
     * @Route("/home")
     * @Template("RageTankUserBundle:Default:pages/home.html.twig")
     */
    public function homeAction()
    {
        $um = $this->container->get('fos_user.user_manager');
        $user = $this->getUser();
        return array();
    }
    
    /**
     * @Route("/email")
     * @Template("RageTankUserBundle:Default:pages/home.html.twig")
     */
    public function emailAction()
    {
        $name = 'John' ;
        $message = \Swift_Message::newInstance()
            ->setSubject('Hello Email')
            ->setFrom('send@example.com')
            ->setTo('johnbdegner@yahoo.com')
            ->setBody($this->renderView('RageTankUserBundle:Default:emails/activation.txt.twig', array('name' => $name)))
        ;
        $this->get('mailer')->send($message);

        return array();
    }
    

    /**
     * @Route("/admin/")
     * @Template("RageTankUserBundle:Default:pages/home.html.twig")
     */
    public function adminAction()
    {
        $um = $this->container->get('fos_user.user_manager');
        $user = $this->getUser();
        var_dump($user); die;
        return array();
    }

    /**
     * @Route("/ask")
     */
    public function askAction()
    {
        $request  = $this->get('request');
        $em       = $this->getDoctrine()->getEntityManager();

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
