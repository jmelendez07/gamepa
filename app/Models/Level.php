<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Level extends Model
{

    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'levels';

    protected $fillable = [
        'order',
        'xp_required',
        'next_level_xp'
    ];

    public function profiles()
    {
        return $this->hasMany(Profile::class);
    }
}
