<?php

namespace App\Services\Modules;

use App\Models\User;
use App\Models\Role;

class DashboardService
{
    public function __construct(User $userModel, Role $roleModel)
    {
        $this->userModel = $userModel;
        $this->roleModel = $roleModel;
    }

    public function index()
    {
        $users = [];
        $roles = [];

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
