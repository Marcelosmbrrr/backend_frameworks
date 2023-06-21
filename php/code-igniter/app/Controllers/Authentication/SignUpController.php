<?php

namespace App\Controllers\Authentication;

use App\Controllers\BaseController;
use App\Services\Authentication\SignUpService;

class SignUpController extends BaseController
{
    function __construct(SignUpService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $this->service->index();
    }
}
