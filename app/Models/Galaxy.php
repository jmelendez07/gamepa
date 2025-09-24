<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Galaxy extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'galaxies';

    protected $fillable = [
        'name',
        'number',
        'image_url',
        'image_public_id'
    ];

    public function planets()
    {
        return $this->hasMany(Planet::class)->orderBy('number', 'asc');
    }
}
