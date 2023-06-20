<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password'
    ];

    function role()
    {
        return $this->belongsTo(Role::class, "role_id", "id");
    }

    // Acessor
    protected function firstName(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => explode(" ", $value)[0],
        );
    }

    // Mutator
    protected function password(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => Hash::make($value),
        );
    }

    function scopeSearch($query, $value)
    {
        return $query->when((bool) $value, function ($query) use ($value) {

            if (is_numeric($value)) {
                $query->where('users.id', $value);
            } else {
                $query->where('users.name', 'LIKE', '%' . $value . '%')->orWhere('users.email', 'LIKE', '%' . $value);
            }
        });
    }
}
