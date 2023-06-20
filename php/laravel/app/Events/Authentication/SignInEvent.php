<?php

namespace App\Events\Authentication;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class SignInEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
