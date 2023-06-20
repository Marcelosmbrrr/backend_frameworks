<?php

namespace App\Listeners\Authentication;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Notifications\Authentication\SignInNotification;

class SignInEventListener
{
    public function handle(object $event): void
    {
        if (!$event->user->active) {
            $event->user->update([
                "active" => true
            ]);
        }

        //$event->user->notify(new SignInNotification());
    }
}
