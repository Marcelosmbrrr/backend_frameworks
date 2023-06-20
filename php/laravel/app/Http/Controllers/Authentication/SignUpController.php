<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Events\Authentication\SignUpEvent;
use App\Http\Requests\Authentication\SignUpRequest;

class SignUpController extends Controller
{
    function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    public function __invoke(SignUpRequest $request)
    {
        $user = $this->userModel->create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => $request->password,
            "role_id" => 2
        ]);
        SignUpEvent::dispatch($user);

        return response(["message" => "Successful registration."], 201);
    }
}
