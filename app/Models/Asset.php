<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;

class Asset extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'assets';

    protected $fillable = [
        'url',
    ];

    #[SearchUsingPrefix(['url'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'url' => $this->url,
        ];
    }
}
