<?php

namespace App\Controllers\Authentication;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Authentication\VerifyAuthenticationService;

helper("bearer_token_extraction");

class VerifyAuthenticationController extends BaseController
{
    use ResponseTrait;

    function __construct(VerifyAuthenticationService $service)
    {
        $this->service = $service;
    }

    public function index()
    {

        $token = extractBearerToken($this->request);

        if (!$token) {
            return $this->failUnauthorized(null, null, "Token is missing or is invalid.");
        }

        $payload = $this->service->index($token);
        return $this->respond($payload, 200, "Authentication verified.");
    }
}
