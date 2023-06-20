<?php

namespace App\Observers\Users;

use App\Models\User;
use App\Notifications\Modules\Users\{
    UserCreatedNotification,
    UserUpdatedNotification,
    UserDeletedNotification,
    UserRestoredNotification
};

class UserObserver
{
    public function created(User $user): void
    {
        $user->notify(new UserCreatedNotification());
    }

    public function updated(User $user): void
    {
        $user->notify(new UserUpdatedNotification());
    }

    public function deleted(User $user): void
    {
        $user->notify(new UserDeletedNotification());
    }

    public function restored(User $user): void
    {
        $user->notify(new UserRestoredNotification());
    }
}
