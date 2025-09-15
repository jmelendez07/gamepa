<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;

class Enemy extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'enemies';

    protected $fillable = [
        'name',
        'spritesheet',
        'health',
        'is_hostile',
        'basic_attack',
        'planet_id',
        'enemy_type_id',
    ];

    #[SearchUsingPrefix(['name', 'health', 'basic_attack'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'health' => $this->health,
            'basic_attack' => $this->basic_attack,
        ];
    }

    public function type()
    {
        return $this->belongsTo(EnemyType::class, 'enemy_type_id');
    }

    public function planet()
    {
        return $this->belongsTo(Planet::class, 'planet_id');
    }
}
