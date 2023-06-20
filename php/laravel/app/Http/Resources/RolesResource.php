<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

class RolesResource extends JsonResource
{
    private LengthAwarePaginator $data;

    function __construct(LengthAwarePaginator $data)
    {
        $this->data = $data;
    }

    public function toArray(Request $request): array
    {
        $formated_data = [];

        foreach ($this->data as $role_index => $role) {

            $formated_data[$role_index] = [
                "id" => $role->id,
                "name" => $role->name,
                "created_at" => $role->created_at,
                "updated_at" => $role->updated_at,
            ];

            foreach ($role->modules as $module_index => $module) {
                $formated_data[$role_index]["modules"][$module_index] = $module->pivot;
            }
        }

        return $formated_data;
    }
}
