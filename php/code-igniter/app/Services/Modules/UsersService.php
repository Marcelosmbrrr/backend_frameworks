<?php

namespace App\Services\Modules;

use App\Models\User;

class UsersService
{
    public function __construct()
    {
        $this->model = new User();
    }

    public function index(string $limit, int $page, $search = null)
    {
        $paginate = $this->model->paginate($limit, 'users', $page);
        return $paginate;
    }

    public function create(array $data)
    {
        echo "create user";
    }

    public function update(string $id, array $data)
    {
        echo "update user";
    }

    public function delete(string $id)
    {
        echo "delete user";
    }
}
