<?php

namespace App\Events\Authentication;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class SignUpEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }
}
