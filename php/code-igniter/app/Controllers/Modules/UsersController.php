<?php

namespace App\Controllers\Modules;

use App\Controllers\BaseController;
use App\Services\Modules\UsersService;

class UsersController extends BaseController
{
    function __construct(UsersService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $users = $this->service->index();
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
