<?php

namespace App\Services\Modules;

use App\Models\Role;

class RolesService
{

    function __construct(Role $model)
    {
        $this->model = $model;
    }

    public function index($limit, $page, $search = null)
    {
        //
    }

    public function store($data)
    {
        //
    }

    public function update($data, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
