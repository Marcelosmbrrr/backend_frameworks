<?php

namespace App\Services\Modules;
use App\Models\Role;

class RolesService
{
    public function __construct()
    {
        $this->model = new Role();
    }

    public function index(string $limit, int $page, $search = null)
    {
        $paginate = $this->model->paginate($limit, 'roles', $page);
        return $paginate;
    }

    public function create(array $data){
       echo "create role";
    }

    public function update(string $id, array $data){
        echo "update role";
    }

    public function delete(string $id){
        echo "delete role";
    }
}
