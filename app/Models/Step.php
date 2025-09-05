<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;

class Step extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'steps';

    protected $fillable = [
        'order'
    ];

    #[SearchUsingPrefix(['order'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'order' => $this->order
        ];
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }
}
