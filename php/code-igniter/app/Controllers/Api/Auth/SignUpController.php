<?php

namespace App\Controllers\Api\Auth;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Authentication\SignUpService;

class SignUpController extends BaseController
{
    use ResponseTrait;

    function __construct()
    {
        $this->service = new SignUpService();
    }

    public function index()
    {
        try {

            echo "sign up";

            /*
            $this->validate([
                "name" => "required|min_length[3]|min_length[100]",
                "email" => "required|valid_email|is_unique[users.email]",
                "password" => "required",
                "password_confirmation" => "required|matches[password]"
            ]);

            $this->service->index($this->request->getJSON());

            return $this->respondCreated(null, "Successful registration!");
            */
        } catch (\Exception $e) {
            return $this->failServerError(null, null, $e->getMessage());
        }
    }
}
