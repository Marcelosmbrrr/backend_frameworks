<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {

        $admin = Role::create(["name" => "Admin"]);
        // attach

        $common = Role::create(["name" => "Common"]);
        // attach
    }
}
