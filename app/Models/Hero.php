<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;

class Hero extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'heroes';

    protected $fillable = [
        'name',
        'spritesheet',
        'health',
    ];

    #[SearchUsingPrefix(['name', 'health'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'health' => $this->health
        ];
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
