<?php

namespace App\Controllers\Authentication;

use App\Controllers\BaseController;
use App\Services\Authentication\VerifyAuthenticationService;

class VerifyAuthenticationController extends BaseController
{
    function __construct(VerifyAuthenticationService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $payload = $this->service->index();
    }
}
