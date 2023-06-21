<?php

namespace App\Services\Modules;

use App\Models\User;

class UsersService
{
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function index(string $limit, int $page, $search = null)
    {
        $paginate = $this->model->paginate($limit, 'users', $page);

        return $paginate;
    }

    public function create()
    {
        //
    }

    public function update()
    {
        //
    }

    public function delete()
    {
        //
    }
}
