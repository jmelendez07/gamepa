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
        'reward_xp'
    ];

    #[SearchUsingPrefix(['name'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'reward_xp' => $this->reward_xp,
        ];
    }

    public function enemies()
    {
        return $this->hasMany(Enemy::class, 'enemy_type_id');
    }
}
