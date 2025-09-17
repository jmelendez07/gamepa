<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Answer extends Model
{
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
        return $this->belongsTo(Question::class, 'question_id');
    }
}
