<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{

    function __construct(User $model)
    {
        $this->model = $model;
    }

    function signIn(Request $request)
    {
        try {

            if (!Auth::attempt($request->validated())) {
                throw new \Exception("Invalid credentials.", 401);
            }

            $request->session()->regenerate();

            return response(["message" => "Successful login!"], 200);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }

    function signUp(Request $request)
    {
        try {
            $user = $this->model->create($request->validated());
            return response(["message" => "Successful registration!"], 200);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }

    function refreshAndVerifyAuthentication()
    {
        try {

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

            return response([
                "message" => "Authentication verified.",
                ...$payload
            ], 200);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }

    function signOut(Request $request)
    {
        try {

            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response([
                "message" => "User has been logged out."
            ]);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }
}
