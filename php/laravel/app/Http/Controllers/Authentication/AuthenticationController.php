<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Services\Modules\AuthenticationService;
use App\Http\Requests\Authentication\{
    SignInRequest,
    SignUpRequest
};

class AuthenticationController extends Controller
{

    function __construct(AuthenticationService $service, User $model)
    {
        $this->service = $service;
        $this->model = $model;
    }

    function signIn(SignInRequest $request)
    {
        try {
            $payload = $this->service->signIn($request);
            return response($payload, 200);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }

    function signUp(SignUpRequest $request)
    {
        try {
            $this->service->signUp($request->validated());
            return response(["message" => "Successful registration!"], 200);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }

    function refreshAndVerifyAuthentication()
    {
        try {

            $payload = $this->service->refreshAndVerifyAuthentication();

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
            $request->user()->tokens()->delete();

            return response([
                "message" => "User has been logged out."
            ]);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }
}
