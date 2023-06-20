<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Events\Authentication\SignInEvent;
use App\Http\Requests\Authentication\SignInRequest;
use App\Models\User;

class SignInController extends Controller
{
    function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    public function __invoke(SignInRequest $request)
    {
        try {

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

            SignInEvent::dispatch($user);

            return response($payload, 200);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }
}
