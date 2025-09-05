<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;

class TypeCard extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'type_cards';

    protected $fillable = [
        'name'
    ];

    #[SearchUsingPrefix(['name'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name
        ];
    }

    public function cards()
    {
        return $this->hasMany(Card::class);
    }
}
