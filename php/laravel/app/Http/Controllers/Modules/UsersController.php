<?php

namespace App\Http\Controllers\Modules;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\Gate;
use App\Services\Modules\UsersService;

class UsersController extends Controller
{
    function __construct(UsersService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        Gate::authorize('users:read');

        $users = $this->service->index(request()->limit, request()->page, request()->search);
        return response([
            "message" => "Users found.",
            "users" => $users
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('users:write');

        $this->service->store($request->validated());
        return response([
            "message" => "User successful created."
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        Gate::authorize('users:write');

        $this->service->store($request->validated(), $id);
        return response([
            "message" => "User successful updated."
        ], 200);
    }

    public function destroy(string $id)
    {
        Gate::authorize('users:write');

        $this->service->destroy($id);
        return response([
            "message" => "User successful deleted."
        ], 200);
    }
}
