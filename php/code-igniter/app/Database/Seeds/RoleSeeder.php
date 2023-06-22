<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Models\Role;
use App\Models\ModuleRole;

class RoleSeeder extends Seeder
{
    function __construct()
    {
        $this->roleModel = new Role();
        $this->moduleRoleModel = new ModuleRole();
    }

    public function run()
    {
        // Create roles

        $admin_id = $this->roleModel->insert([
            "name" => "Admin"
        ]);

        $common_id = $this->roleModel->insert([
            "name" => "Common"
        ]);

        // Roles -> modules - many to many

        for ($i = 1; $i <= 2; $i++) {
            $this->moduleRoleModel->insert([
                "role_id" => $admin_id,
                "module_id" => $i,
                "read" => true,
                "write" => true
            ]);
        }

        for ($i = 1; $i <= 2; $i++) {
            $this->moduleRoleModel->insert([
                "role_id" => $common_id,
                "module_id" => $i,
                "read" => true,
                "write" => false
            ]);
        }
    }
}
