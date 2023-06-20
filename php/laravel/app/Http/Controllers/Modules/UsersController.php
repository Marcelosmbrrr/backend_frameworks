<?php

namespace App\Http\Controllers\Modules;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Access\Gate;
use App\Services\Modules\UsersService;
use App\Http\Requests\Modules\Users\{
    CreateUserRequest,
    UpdateUserRequest
};
use App\Http\Resources\UsersResource;

class UsersController extends Controller
{
    function __construct(UsersService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $users = $this->service->index(request()->limit, request()->page, request()->search);

        return response([
            "message" => "Users found.",
            "users" => new UsersResource($users)
        ]);
    }

    public function store(CreateUserRequest $request)
    {
        $this->service->store($request->validated());
        return response([
            "message" => "User successful created."
        ], 201);
    }

    public function update(UpdateUserRequest $request, string $id)
    {
        $this->service->store($request->validated(), $id);
        return response([
            "message" => "User successful updated."
        ], 200);
    }

    public function destroy(string $id)
    {
        $this->service->destroy($id);
        return response([
            "message" => "User successful deleted."
        ], 200);
    }
}
