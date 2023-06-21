<?php

namespace App\Controllers\Modules;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Modules\UsersService;

class UsersController extends BaseController
{
    use ResponseTrait;

    function __construct(UsersService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $limit = $this->input->get('limit', true);
        $page = $this->input->get('page', true);
        $search = $this->input->get('search', true);

        $users = $this->service->index($limit, $page, $search);

        return $this->respond([
            "message" => "Users found.",
            "users" => $users
        ], 200);
    }

    public function create()
    {
        $this->validate([
            "name" => "required|min_length[3]|max_length[100]",
            "email" => "required|valid_email|is_unique[users.email]",
            "password" => "required"
        ]);

        $this->service->create();
        return $this->respondCreated(null, "User successful created.");
    }

    public function update()
    {
        $this->validate([
            "name" => "required|min_length[3]|max_length[100]",
            "email" => "required|valid_email",
            "role_id" => "required"
        ]);

        $this->service->update();
        return $this->respondUpdated(null, "User successful updated.");
    }

    public function delete()
    {
        $this->service->delete();
        return $this->respondDeleted(null, "User successful deleted.");
    }
}
