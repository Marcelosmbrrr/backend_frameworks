<?php

namespace App\Controllers\Authentication;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ApiToken;

helper("bearer_token_extraction");

class SignOutController extends BaseController
{
    use ResponseTrait;

    public function __construct(ApiToken $model)
    {
        $this->model = $model;
    }

    public function index()
    {

        $token = extractBearerToken($this->request);

        if (!$token) {
            return $this->failUnauthorized(null, null, "Token is missing or is invalid.");
        }

        $this->model->where("token", $token)->set(["is_valid" => false])->update();

        return $this->respond(null, 200, "User has been logged out.");
    }
}
