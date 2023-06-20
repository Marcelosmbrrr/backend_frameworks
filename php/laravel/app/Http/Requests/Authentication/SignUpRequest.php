<?php

namespace App\Http\Requests\Authentication;

use Illuminate\Foundation\Http\FormRequest;

class SignUpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => ["required", "min:3", "max:100"],
            "email" => ["required", "email", "unique:users,email"],
            "password" => ["required", "confirmed", "max:100"]
        ];
    }
}
