<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class HeroAnimations extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'hero_animations';

    protected $fillable = [
        'action',
        'spritesheet_url',
        'row',
        'totalFrames',
        'hero_id',
    ];

    public function hero()
    {
        return $this->belongsTo(Hero::class);
    }
}
