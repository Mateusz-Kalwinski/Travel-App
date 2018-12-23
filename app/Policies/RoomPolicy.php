<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\App;
use function PHPSTORM_META\elementType;

class RoomPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function checkOwner(User $user, \App\Room $room) {

        return $user->id === $room->object->user_id;

    }
}
