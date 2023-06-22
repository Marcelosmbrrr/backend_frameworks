<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    function __construct()
    {
        $this->model = new User();
    }

    public function run()
    {
        $this->model->insert([
            "name" => "Administrator",
            "email" => "admin@gmail.com",
            "role_id" => 1,
            "password" => password_hash("123123", PASSWORD_DEFAULT)
        ]);
    }
}
