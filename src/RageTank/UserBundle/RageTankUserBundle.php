<?php

namespace RageTank\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class RageTankUserBundle extends Bundle
{
    public function getParent()
    {
        return "FOSUserBundle";
    }
}
