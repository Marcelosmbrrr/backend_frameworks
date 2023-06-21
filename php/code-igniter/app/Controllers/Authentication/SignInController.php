<?php

namespace App\Controllers\Authentication;

use App\Controllers\BaseController;
use App\Services\Authentication\SignInService;

class SignInController extends BaseController
{
    function __construct(SignInService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $payload = $this->service->index();
    }
}
