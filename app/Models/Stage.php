<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Stage extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'stages';

    protected $fillable = [
        'name',
        'number',
        'planet_id',
        'image_url',
        'image_public_id'
    ];

    public function planet()
    {
        return $this->belongsTo(Planet::class);
    }
}
