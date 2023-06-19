<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Module;
use App\Models\User;

class Role extends Model
{
    use HasFactory;

    protected $guarded = [];

    function users()
    {
        return $this->hasMany(User::class, "role_id", "id");
    }

    function modules()
    {
        $this->belongsToMany(Module::class, "module_role", "role_id")->withPivot('read', 'write');;
    }

    function scopeSearch($query, $value)
    {
        return $query->when((bool) $value, function ($query) use ($value) {

            if (is_numeric($value)) {
                $query->where('roles.id', $value);
            } else {
                $query->where('roles.name', 'LIKE', '%' . $value . '%');
            }
        });
    }
}
