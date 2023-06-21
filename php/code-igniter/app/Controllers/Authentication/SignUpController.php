<?php

namespace App\Controllers\Authentication;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Authentication\SignUpService;

class SignUpController extends BaseController
{
    use ResponseTrait;

    function __construct(SignUpService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $this->validate([
            "name" => "required|min_length[3]|min_length[100]",
            "email" => "required|valid_email|is_unique[users.email]",
            "password" => "required"
        ]);

        $this->service->index([
            "name" => $this->request->getVar("name"),
            "email" => $this->request->getVar("email"),
            "password" => $this->request->getVar("password")
        ]);
        return $this->respondCreated(null, "Successful registration!");
    }
}
