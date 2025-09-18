<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;

class Answer extends Model
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
    protected $collection = 'answers';

    protected $fillable = [
        'text',
        'is_correct',
        'question_id'
    ];

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id', '_id');
    }
}
