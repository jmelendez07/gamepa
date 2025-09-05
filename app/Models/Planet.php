<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;

class Planet extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'planets';

    protected $fillable = [
        'name',
        'description',
    ];

    #[SearchUsingPrefix(['name', 'description'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
        ];
    }

    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }
}
