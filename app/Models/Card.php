<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;

class Card extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'cards';

    protected $fillable = [
        'energy_cost',
        'stats'
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
        return $this->belongsTo(TypeCard::class);
    }
}
