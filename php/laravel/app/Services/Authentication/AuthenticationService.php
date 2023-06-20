<?php

namespace App\Services\Modules;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationService
{

    function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    function signIn(Request $request)
    {
        if (!Auth::attempt($request->validated())) {
            throw new \Exception("Invalid credentials.", 401);
        }

        $request->session()->regenerate();
        $token = $request->user()->createToken("access_token");

        $user = Auth::user();

        $modules = [];
        foreach ($user->role->modules as $index => $module) {
            $modules[$index] = $module->pivot;
        }

        $payload = [
            "user" => [
                "id" => $user->id,
                "role" => [
                    "id" => $user->role->id,
                    "modules" => $modules
                ]
            ],
            "token" => $token->plainTextToken
        ];

        // Send email

        return $payload;
    }

    function signUp($data)
    {
        $this->model->create($data);

        // Send email
    }

    function refreshAndVerifyAuthentication()
    {
        if (!Auth::check()) {
            throw new \Exception("Unauthorized.", 401);
        }

        $user = Auth::user();

        $modules = [];
        foreach ($user->role->modules as $index => $module) {
            $modules[$index] = $module->pivot;
        }

        $payload = [
            "id" => $user->id,
            "role" => [
                "id" => $user->role->id,
                "modules" => $modules
            ]
        ];

        return $payload;
    }
}
