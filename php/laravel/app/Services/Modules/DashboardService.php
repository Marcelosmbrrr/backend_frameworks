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

        $users = $this->userModel->withTrashed()->get();
        $roles = $this->roleModel->withTrashed()->get();

        $data = [
            "users" => [
                "created" => $users->count(),
                "verified" => count(array_filter($users, function ($user) {
                    return $user['active'];
                })),
                "deleted" => count(array_filter($users, function ($user) {
                    return $user['deleted_at'];
                }))
            ],
            "roles" => [
                "created" => $roles->count(),
                "used" => count(array_filter($roles, function ($role) {
                    return $role->users->exists();
                })),
                "deleted" => count(array_filter($roles, function ($role) {
                    return $role['deleted_at'];
                }))
            ]
        ];

        return $data;
    }
}
