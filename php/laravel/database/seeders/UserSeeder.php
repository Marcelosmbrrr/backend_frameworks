<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            "name" => "Administrator",
            "email" => "admin@gmail.com",
            "role_id" => 1,
            "password" => "123123"
        ]);
    }
}
