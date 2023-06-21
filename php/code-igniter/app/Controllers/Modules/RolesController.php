<?php

namespace App\Controllers\Modules;

use App\Controllers\BaseController;
use App\Services\Modules\RolesService;

class RolesController extends BaseController
{
    function __construct(RolesService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $roles = $this->service->index();
    }

    public function create(){
        $this->service->create();
    }

    public function update(){
        $this->service->update();
    }

    public function delete(){
        $this->service->delete();
    }
}
