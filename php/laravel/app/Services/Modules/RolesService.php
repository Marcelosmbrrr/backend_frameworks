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
        return $this->model->with(["modules"])
            ->search($search)
            ->paginate((int) $limit, $columns = ['*'], $pageName = 'users', (int) $page);
    }

    public function store($data)
    {
        $this->model->create($data);
    }

    public function update($data, string $id)
    {
        $role = $this->model->findOrFail($id);

        if (!$role) {
            throw new \Exception("User not found.", 404);
        }

        $role->update($data);
    }

    public function destroy(string $id)
    {
        $role = $this->model->findOrFail($id);

        if (!$role) {
            throw new \Exception("User not found.", 404);
        }

        $role->delete();
    }
}
