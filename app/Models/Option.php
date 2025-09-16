<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;

class Option extends Model
{
    use Searchable;
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'options';

    protected $fillable = [
        'result',
        'step_id',
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
