<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;

class Room extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'rooms';

    protected $fillable = [
        'pin',
        'name',
        'teacher_id',
        'status_id',
        'start_at',
        'end_at',
    ];

    #[SearchUsingPrefix(['name', 'pin'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'pin' => $this->pin,
            'name' => $this->name,
        ];
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function status()
    {
        return $this->belongsTo(RoomStatus::class, 'status_id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'room_id');
    }

    public static function generateUniquePin(): string
    {
        do {
            $pin = str_pad(random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
        } while (self::where('pin', $pin)->exists());

        return $pin;
    }
}
