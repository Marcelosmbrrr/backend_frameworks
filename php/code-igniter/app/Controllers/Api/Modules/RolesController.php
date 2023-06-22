<?php

namespace App\Controllers\Api\Modules;

use CodeIgniter\RESTful\ResourceController; // must add mannually
use CodeIgniter\API\ResponseTrait;
use App\Services\Modules\RolesService;

class RolesController extends ResourceController
{
    use ResponseTrait;

    function __construct()
    {
        $this->service = new RolesService();
    }

    public function index()
    {
        $limit = $this->input->get('limit', true);
        $page = $this->input->get('page', true);
        $search = $this->input->get('search', true);

        $roles = $this->service->index($limit, $page, $search);

        return $this->respond([
            "message" => "Users found.",
            "users" => $roles
        ], 200);
    }

    public function create()
    {
        $this->validate([
            "name" => "required|min_length[3]|max_length[100]",
            "modules" => "required"
        ]);

        $this->service->create($this->request->getJSON());
        return $this->respondCreated(null, "Role successful created.");
    }

    public function update($id = null)
    {
        $this->validate([
            "name" => "required|min_length[3]|max_length[100]",
            "modules" => "required"
        ]);

        $this->service->update($id, $this->request->getJSON());
        return $this->respondUpdated(null, "Role successful updated.");
    }

    public function delete($id = null)
    {
        $this->service->delete($id);
        return $this->respondDeleted(null, "Role successful deleted.");
    }
}
