<?php

namespace App\Controllers\Authentication;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Authentication\VerifyAuthenticationService;

class VerifyAuthenticationController extends BaseController
{
    use ResponseTrait;

    function __construct(VerifyAuthenticationService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $payload = $this->service->index($this->request->getServer('HTTP_AUTHORIZATION'));
        return $this->respond($payload, 200, "Authentication verified.");
    }
}
