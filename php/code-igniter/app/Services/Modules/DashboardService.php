<?php

namespace App\Services\Modules;

use App\Models\User;
use App\Models\Role;

class DashboardService
{
    public function __construct()
    {
        $this->userModel = new User();
        $this->roleModel = new Role();
    }

    public function index()
    {
        $users = $this->userModel->findAll();
        $roles = $this->roleModel->findAll();

        $data = [
            "users" => [
                "created" => 0,
                "verified" => 0,
                "deleted" => 0
            ],
            "roles" => [
                "created" => 0,
                "used" => 0,
                "deleted" => 0
            ]
        ];

        return $data;
    }
}
