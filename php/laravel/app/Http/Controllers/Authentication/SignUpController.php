<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
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
        try {
            $user = $this->userModel->create($request->validated());
            SignUpEvent::dispatch($user);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], $e->getCode());
        }
    }
}
