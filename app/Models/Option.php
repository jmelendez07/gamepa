<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;

class Option extends Model
{
    use Searchable;

    protected $connection = 'mongodb';
    protected $collection = 'options';

    protected $fillable = [
        'result',
        'is_correct'
    ];

    #[SearchUsingPrefix(['result'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'result' => $this->result
        ];
    }

    public function step()
    {
        return $this->belongsTo(Step::class);
    }
}
