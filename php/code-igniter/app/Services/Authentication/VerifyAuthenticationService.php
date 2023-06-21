<?php

namespace App\Services\Authentication;

use App\Models\User;

class VerifyAuthenticationService
{
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function index(string $token)
    {
        return $token;
    }
}