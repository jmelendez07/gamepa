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
        'operation',
        'planet_id',
        'difficulty_id'
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

    public function difficulty()
    {
        return $this->belongsTo(Dificulty::class);
    }

    public function steps()
    {
        return $this->hasMany(Step::class);
    }

    public function cards()
    {
        return $this->belongsToMany(Card::class);
    }
}