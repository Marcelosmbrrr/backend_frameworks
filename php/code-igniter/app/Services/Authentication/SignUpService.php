<?php

namespace App\Services\Authentication;

use App\Models\User;

class SignUpService
{
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function index($data)
    {
        $this->model->insert([
            "name" => $data["name"],
            "email" => $data["email"],
            "password" => password_hash($data["password"], PASSWORD_DEFAULT),
            "role_id" => 2
        ]);
    }
}
