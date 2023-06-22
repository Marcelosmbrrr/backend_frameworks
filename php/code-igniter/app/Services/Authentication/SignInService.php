<?php

namespace App\Services\Authentication;

use App\Models\User;
use App\Models\ApiToken;
use Firebase\JWT\JWT;

class SignInService
{
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function index($data)
    {
        $user = $this->model->where("email", $data["email"])->first();

        return $user;

        if(!$user){
            throw new \Exception("Email not found.", 404);
        }

        $password_verify = password_verify($data["password"], $user->password);

        if(!$password_verify){
            throw new \Exception("Invalid password.", 401);
        }

        $token = JWT::encode(["user_id" => 1], getenv("JWT_SECRET"), 'HS256');

        $this->saveApiToken($token, $user["id"]);

        $data = [
            "user" => [
                "id" => 1,
                "role" => [
                    "id" => $user["role_id"],
                    "modules" => []
                ]
            ],
            "token" => $token
        ];

        return $data;
    }

    public function saveApiToken($token, $user_id){

        

    }
}
