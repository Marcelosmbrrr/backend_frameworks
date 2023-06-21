<?php

namespace App\Services\Authentication;

use App\Models\User;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;

class VerifyAuthenticationService
{
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function index(string $token)
    {

        $token = explode(" ", $token)[1]; // Bearer value

        $decoded = (array) JWT::decode($token, new Key(getenv("JWT_SECRET"), 'HS256'));

        if(!$decoded){
            throw new \Exception("Unauthorized.", 401);
        }

        $user = $this->model->find($decoded["user_id"]);

        if (!$user) {
            throw new \Exception("Email not found.", 404);
        }

        $data = [
            "user" => [
                "id" => 1,
                "role" => [
                    "id" => 1,
                    "modules" => []
                ]
            ]
        ];

        return $data;
    }
}
