<?php

namespace App\Controllers\Authentication;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Authentication\SignInService;

class SignInController extends BaseController
{
    use ResponseTrait;

    function __construct(SignInService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $this->validate([
            "email" => "required|valid_email",
            "password" => "required"
        ]);

        $payload = $this->service->index([
            "email" => $this->request->getVar("email"),
            "password" => $this->request->getVar("password")
        ]);
        
        return $this->respond($payload, 200);
    }
}
