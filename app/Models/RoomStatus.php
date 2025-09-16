<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class RoomStatus extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'room_statuses';

    protected $fillable = [
        'name'
    ];
}
