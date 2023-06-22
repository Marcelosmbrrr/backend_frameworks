<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Models\Module;

class ModuleSeeder extends Seeder
{
    function __construct()
    {
        $this->model = new Module();
    }

    public function run()
    {
        $this->model->insert([
            "name" => "Users"
        ]);

        $this->model->insert([
            "name" => "Roles"
        ]);
    }
}
