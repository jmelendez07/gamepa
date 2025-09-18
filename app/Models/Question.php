<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;


class Question extends Model
{
    use Searchable;

    #[SearchUsingPrefix(['text'])]
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
        ];
    }

    protected $connection = 'mongodb';
    protected $collection = 'questions';

    protected $fillable = [
        'text',
        'room_id',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class, 'question_id', '_id');
    }
}
