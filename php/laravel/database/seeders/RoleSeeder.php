<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {

        $admin = Role::create(["name" => "Admin"]);
        $common = Role::create(["name" => "Common"]);

        // Admin -> modules
        $admin->modules()->attach([
            1 => ['read' => true, 'write' => true],
            2 => ['read' => true, 'write' => true],
        ]);

        // Common -> modules
        $common->modules()->attach([
            1 => ['read' => true, 'write' => false],
            2 => ['read' => true, 'write' => false],
        ]);
    }
}
