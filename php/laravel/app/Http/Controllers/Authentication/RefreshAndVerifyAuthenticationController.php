<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class RefreshAndVerifyAuthenticationController extends Controller
{
    public function __invoke()
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
}
