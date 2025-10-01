<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class HeroRole extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'hero_roles';

    protected $fillable = [
        'name',
        'description',
        'icon_url'
    ];

    public function heroes()
    {
        return $this->hasMany(Hero::class);
    }
}
