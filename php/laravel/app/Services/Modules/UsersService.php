<?php

namespace App\Services\Modules;

use App\Models\User;

class UsersService
{

    function __construct(User $model)
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
