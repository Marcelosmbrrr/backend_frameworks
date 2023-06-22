<?php

namespace App\Controllers\Api\Auth;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Authentication\SignInService;

class SignInController extends BaseController
{
    use ResponseTrait;

    function __construct()
    {
        $this->service = new SignInService();
    }

    public function index()
    {
        try {

            echo "sign in";

            /*
            $this->validate([
                "email" => "required|valid_email",
                "password" => "required"
            ]);

            $payload = $this->service->index([
                "email" => $this->request->getVar("email"),
                "password" => $this->request->getVar("password")
            ]);

            return $this->respond($payload, 200);
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
