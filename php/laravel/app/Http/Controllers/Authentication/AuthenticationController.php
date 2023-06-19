<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Authentication\AuthenticationService;

class AuthenticationController extends Controller
{

    function __construct(AuthenticationService $service)
    {
        $this->service = $service;
    }

    function signIn()
    {
        $this->signIn();
        return response(["message" => "Successful login!"], 200);
    }

    function signUp()
    {
        $this->signUp();
        return response(["message" => "Successful registration!"], 200);
    }

    function refreshAndVerifyAuthentication()
    {
        $data = $this->refreshAndVerifyAuthentication();
        return response([
            "message" => "Authentication verified.",
            ...$data
        ], 200);
    }

    function signOut()
    {
        $this->signOut();
        return response([
            "message" => "User has been logged out."
        ]);
    }
}
