<?php

namespace App\Services\Modules;

use App\Models\User;
use App\Models\Role;

class DashboardService
{

    function __construct(User $userModel, Role $roleModel)
    {
        $this->userModel = $userModel;
        $this->roleModel = $roleModel;
    }

    function index()
    {

        $users = $this->userModel->all();
        $roles = $this->roleModel->all();

        $data = [
            "users" => [
                "created" => $users->count(),
                "verified" => $users->filter(function ($user) {
                    return $user["active"];
                })->count(),
                "deleted" => $users->filter(function ($user) {
                    return $user["deleted_at"] != null;
                })->count()
            ],
            "roles" => [
                "created" => $roles->count(),
                "used" => $roles->filter(function ($role) {
                    return $role->users()->exists();
                })->count(),
                "deleted" => $roles->filter(function ($role) {
                    return $role["deleted_at"] != null;
                })->count()
            ]
        ];

        return $data;
    }
}
