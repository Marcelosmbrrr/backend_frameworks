<?php

namespace App\Controllers\Authentication;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class SignOutController extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        // Clean token
        return $this->respond(null, 200, "User has been logged out.");
    }
}
