<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;

class Exercise extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'exercises';

    protected $fillable = [
        'operation'
    ];

    #[SearchUsingPrefix(['operation'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'operation' => $this->operation
        ];
    }

    public function planet()
    {
        return $this->belongsTo(Planet::class);
    }

    public function dificulty()
    {
        return $this->belongsTo(Dificulty::class);
    }
}