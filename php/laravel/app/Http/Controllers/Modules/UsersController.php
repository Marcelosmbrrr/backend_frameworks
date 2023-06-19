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

    public function store(Request $request)
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

    public function update(Request $request, string $id)
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
