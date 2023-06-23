<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;

class BearerTokenExtraction
{

    private ?string $token = null;
    private bool $is_valid = false;

    function extract(Request $request)
    {

        $authentication_header = $request->headers->get('Authorization');

        if (!$authentication_header) {
            $this->is_valid = false;
        }

        $arr_header = explode(" ", $authentication_header);

        if ($arr_header[0] != "Bearer") {
            $this->is_valid = false;
        }

        $token = $arr_header[1];

        $decoded = (array) JWT::decode($token, new Key(getenv("JWT_SECRET"), 'HS256'));

        if ($decoded) {
            $this->is_valid = true;
            $this->token = $token;
        }
    }

    function isValid()
    {
        return $this->is_valid;
    }

    function getToken()
    {
        return $this->token;
    }
}
