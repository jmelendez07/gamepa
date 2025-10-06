<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class StageVectorPoint extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'stage_vector_points';

    protected $fillable = [
        'stage_id',
        'x',
        'y',
        'number'
    ];

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
}
