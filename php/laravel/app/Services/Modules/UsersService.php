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
        return $this->model->with(["role:id,name"])
            ->search($search)
            ->paginate((int) $limit, $columns = ['*'], $pageName = 'users', (int) $page);
    }

    public function store($data)
    {
        $this->model->create($data);
    }

    public function update($data, string $id)
    {
        $user = $this->model->findOrFail($id);

        if (!$user) {
            throw new \Exception("User not found.", 404);
        }

        $user->update($data);
    }

    public function destroy(string $id)
    {
        $user = $this->model->findOrFail($id);

        if (!$user) {
            throw new \Exception("User not found.", 404);
        }

        $user->delete();
    }
}
