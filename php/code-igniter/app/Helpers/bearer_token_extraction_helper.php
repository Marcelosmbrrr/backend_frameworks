<?php

use CodeIgniter\HTTP\IncomingRequest;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;

// How create and use helper: https://www.youtube.com/watch?v=FudI8_E1kNE

function extractBearerToken(IncomingRequest $request)
{

    $authentication_header = $request->getServer('HTTP_AUTHORIZATION');

    if (!$authentication_header) {
        return false;
    }

    $arr_header = explode(" ", $authentication_header);

    if ($arr_header[0] != "Bearer") {
        return false;
    }

    $token = $arr_header[1];

    $decoded = (array) JWT::decode($token, new Key(getenv("JWT_SECRET"), 'HS256'));

    if (!$decoded) {
        return false;
    }

    return $token;
}
