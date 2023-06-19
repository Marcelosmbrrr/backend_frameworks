<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    public function boot(): void
    {
        Gate::define('users:read', function (User $user) {
            return $user->role->modules[0]->pivot->read;
        });

        Gate::define('users:write', function (User $user) {
            return $user->role->modules[0]->pivot->write;
        });

        Gate::define('roles:read', function (User $user) {
            return $user->role->modules[1]->pivot->read;
        });

        Gate::define('roles:write', function (User $user) {
            return $user->role->modules[1]->pivot->write;
        });
    }
}
