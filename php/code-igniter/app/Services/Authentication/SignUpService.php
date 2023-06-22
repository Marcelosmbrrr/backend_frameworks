<?php

namespace App\Services\Authentication;

use App\Models\User;

class SignUpService
{
    public function __construct()
    {
        $this->model = new User();
    }

    public function index($data)
    {
        $registration = $this->model->insert([
            "name" => $data["name"],
            "email" => $data["email"],
            "password" => password_hash($data["password"], PASSWORD_DEFAULT),
            "role_id" => 2
        ]);

        if (!$registration) {
            throw new \Exception("Registration failed.");
        }
    }
}
