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
        dd("dashboard");
    }
}
