<?php

namespace App\Models;

use Laravel\Scout\Attributes\SearchUsingPrefix;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Searchable;

class EnemyType extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'enemy_types';

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
}
