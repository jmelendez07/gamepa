<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;

class Card extends Model
{
    use Searchable;
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'cards';

    protected $fillable = [
        'name',
        'spritesheet',
        'energy_cost',
        'stats',
        'hero_id',
    ];

    #[SearchUsingPrefix(['energy_cost', 'stats'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'energy_cost' => $this->energy_cost,
            'stats' => $this->stats
        ];
    }

    public function type()
    {
        return $this->belongsTo(TypeCard::class, 'type_card_id', '_id');
    }

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class);
    }

    public function hero()
    {
        return $this->belongsTo(Hero::class);
    }
}
