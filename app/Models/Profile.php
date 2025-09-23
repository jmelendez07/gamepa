<?php

namespace App\Models;

use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;
use MongoDB\Laravel\Eloquent\Model;

class Profile extends Model
{
    use Searchable;
    protected $connection = 'mongodb';
    protected $collection = 'profiles';

    protected $fillable = [
        'user_id',
        'level',
        'avatar_url',
        'progress_bar'
    ];

    #[SearchUsingPrefix(['user_id'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'level' => $this->level,
            'avatar_url' => $this->avatar_url,
            'progress_bar' => $this->progress_bar
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
