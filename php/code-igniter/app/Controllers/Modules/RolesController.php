<?php

namespace App\Controllers\Modules;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Modules\RolesService;

class RolesController extends BaseController
{
    use ResponseTrait;

    function __construct(RolesService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $limit = $this->input->get('limit', true);
        $page = $this->input->get('page', true);
        $search = $this->input->get('search', true);

        $roles = $this->service->index($limit, $page, $search);

        return $this->respond([
            "message" => "Users found.",
            "users" => $users
        ], 200);
    }

    public function create()
    {
        $this->validate([
            "name" => "required|min_length[3]|max_length[100]",
            "modules" => "required"
        ]);

        $this->service->create();
        return $this->respondCreated(null, "Role successful created.");
    }

    public function update()
    {
        $this->validate([
            "name" => "required|min_length[3]|max_length[100]",
            "modules" => "required"
        ]);

        $this->service->update();
        return $this->respondUpdated(null, "Role successful updated.");
    }

    public function delete()
    {
        $this->service->delete();
        return $this->respondDeleted(null, "Role successful deleted.");
    }
}
