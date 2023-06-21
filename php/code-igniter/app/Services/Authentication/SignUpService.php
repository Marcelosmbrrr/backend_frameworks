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
        return $data;
    }
}