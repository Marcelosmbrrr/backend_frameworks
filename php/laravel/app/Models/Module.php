<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Role;

class Module extends Model
{
    use HasFactory;

    function roles()
    {
        return $this->belongsToMany(Role::class, "module_role")->withPivot('read', 'write');
    }

    protected $guarded = [];
}
