<?php

namespace App\Services\Authentication;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthenticationService
{

    function __construct(User $model)
    {
        $this->model = $model;
    }

    function signIn()
    {
        dd('sign in');
    }

    function signUp()
    {
        dd('refresh');
    }

    function refreshAndVerifyAuthentication()
    {
        dd('sign up');
    }

    function signOut()
    {
        dd('sign out');
    }
}
