<?php

namespace App\Services\Modules;
use App\Models\Role;

class RolesService
{
    public function __construct(Role $model)
    {
        $this->model = $model;
    }

    public function index(string $limit, int $page, $search = null)
    {
        $paginate = $this->model->paginate($limit, 'roles', $page);

        return $paginate;
    }

    public function create(){
       //
    }

    public function update(){
        //
    }

    public function delete(){
        //
    }
}
