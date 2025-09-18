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

    #[SearchUsingPrefix(['pin', 'name'])]
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'pin' => $this->pin,
            'name' => $this->name,
        ];
    }

    public function teacher()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(RoomStatus::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    // public static function generateUniquePin(): string
    // {
    //     do {
    //         $pin = str_pad(random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
    //     } while (self::where('pin', $pin)->exists());

    //     return $pin;
    // }
}
