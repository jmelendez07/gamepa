<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Scout\Searchable;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;

class Hero extends Model
{
    use Searchable;
    use HasFactory;

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

    public function cards()
    {
        return $this->hasMany(Card::class);
    }

    public function heroAnimations()
    {
        return $this->hasMany(HeroAnimations::class);
    }
}
