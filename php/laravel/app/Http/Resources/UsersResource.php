<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

class UsersResource extends JsonResource
{
    private LengthAwarePaginator $data;

    function __construct(LengthAwarePaginator $data)
    {
        $this->data = $data;
    }

    public function toArray(Request $request): array
    {
        $formated_data = [];

        foreach ($this->data as $user_index => $user) {
            $formated_data[$user_index] = [
                "id" => $user->id,
                "email" => $user->email,
                "name" => $user->name,
                "role_id" => $user->role_id,
                "active" => $user->active,
                "image" => $user->image,
                "created_at" => $user->created_at,
                "updated_at" => $user->updated_at,
                'role' => [
                    "id" => $user->role->id,
                    "name" => $user->role->name
                ]
            ];
        }

        return $formated_data;
    }
}
