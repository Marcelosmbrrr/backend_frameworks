<?php

namespace App\Http\Controllers\Modules;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\Gate;
use App\Services\Modules\RolesService;

class RolesController extends Controller
{
    function __construct(RolesService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        Gate::authorize('roles:read');

        $roles = $this->service->index(request()->limit, request()->page, request()->search);
        return response([
            "message" => "Roles found.",
            "roles" => $roles
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('roles:write');

        $this->service->store($request->validated());
        return response([
            "message" => "Role successful created."
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        Gate::authorize('roles:write');

        $this->service->store($request->validated(), $id);
        return response([
            "message" => "Role successful updated."
        ], 200);
    }

    public function destroy(string $id)
    {
        Gate::authorize('roles:write');
        
        $this->service->destroy($id);
        return response([
            "message" => "Role successful deleted."
        ], 200);
    }
}
