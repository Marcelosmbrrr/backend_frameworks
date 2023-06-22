<?php

namespace App\Entities;

use CodeIgniter\Entity\Entity;

class UserEntity extends Entity
{
    protected $datamap = [];
    protected $dates   = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts   = [];

    protected $attributes = [
        'id'         => null,
        'name'       => null, 
        'email'      => null,
        'password'   => null,
        'role_id'    => null,
        'image'      => null,
        'created_at' => null,
        'updated_at' => null,
        'deleted_at' => null,
    ];

    public function setPassword(string $pass)
    {
        $this->attributes['password'] = password_hash($pass, PASSWORD_DEFAULT);
        return $this;
    }
}
