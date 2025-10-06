<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;

class Dificulty extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'dificulties';

    protected $fillable = [
        'name',
    ];

    #[SearchUsingPrefix(['name'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }

    public function exercises()
    {
        return $this->hasMany(Exercise::class, 'difficulty_id', '_id');
    }
}
