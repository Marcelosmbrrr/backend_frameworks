<?php

namespace App\Http\Controllers\Modules;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Access\Gate;
use App\Services\Modules\RolesService;
use App\Http\Requests\Modules\Roles\{
    CreateRoleRequest,
    UpdateRoleRequest
};
use App\Http\Resources\RolesResource;

class RolesController extends Controller
{
    function __construct(RolesService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $roles = $this->service->index(request()->limit, request()->page, request()->search);
        return response([
            "message" => "Roles found.",
            "roles" => new RolesResource($roles)
        ]);
    }

    public function store(CreateRoleRequest $request)
    {
        $this->service->store($request->validated());
        return response([
            "message" => "Role successful created."
        ], 201);
    }

    public function update(UpdateRoleRequest $request, string $id)
    {
        $this->service->store($request->validated(), $id);
        return response([
            "message" => "Role successful updated."
        ], 200);
    }

    public function destroy(string $id)
    {
        $this->service->destroy($id);
        return response([
            "message" => "Role successful deleted."
        ], 200);
    }
}
