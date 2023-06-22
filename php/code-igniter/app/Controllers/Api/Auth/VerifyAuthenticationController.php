<?php

namespace App\Controllers\Api\Auth;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Authentication\VerifyAuthenticationService;

helper("bearer_token_extraction");

class VerifyAuthenticationController extends BaseController
{
    use ResponseTrait;

    function __construct()
    {
        $this->service = new VerifyAuthenticationService();
    }

    public function index()
    {
        try {

            echo "verify auth";

            /*
            $token = extractBearerToken($this->request);
            if (!$token) {
                return $this->failUnauthorized(null, null, "Token is missing or is invalid.");
            }
            $payload = $this->service->index($token);
            return $this->respond($payload, 200, "Authentication verified.");
            */
            
        } catch (\Exception $e) {
            $code = $e->getCode();
            if ($code === 401) {
                return $this->failUnauthorized(null, null, $e->getMessage());
            } else if ($code === 404) {
                return $this->failNotFound(null, null, $e->getMessage());
            } else {
                return $this->failServerError();
            }
        }
    }
}
