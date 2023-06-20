<?php

namespace App\Http\Controllers\Modules;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Access\Gate;
use App\Services\Modules\UsersService;
use App\Http\Requests\Modules\Users\{
    CreateUserRequest,
    UpdateUserRequest
};

class UsersController extends Controller
{
    function __construct(UsersService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        try {
            Gate::authorize('users:read');

            $users = $this->service->index(request()->limit, request()->page, request()->search);
            return response([
                "message" => "Users found.",
                "users" => $users
            ]);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }

    public function store(CreateUserRequest $request)
    {
        try {
            Gate::authorize('users:write');

            $this->service->store($request->validated());
            return response([
                "message" => "User successful created."
            ], 201);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }

    public function update(UpdateUserRequest $request, string $id)
    {
        try {
            Gate::authorize('users:write');

            $this->service->store($request->validated(), $id);
            return response([
                "message" => "User successful updated."
            ], 200);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }

    public function destroy(string $id)
    {
        try {
            Gate::authorize('users:write');

            $this->service->destroy($id);
            return response([
                "message" => "User successful deleted."
            ], 200);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }
}
