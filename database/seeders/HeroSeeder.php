<?php

namespace Database\Seeders;

use App\Models\Hero;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HeroSeeder extends Seeder
{
    public function run(): void
    {
        $heroes = [
            ['name' => 'Warrior', 'spritesheet' => asset('assets/default_heroes/hero-1.png'), 'health' => 150],
            ['name' => 'Mage', 'spritesheet' => asset('assets/default_heroes/hero-2.png'), 'health' => 100],
            ['name' => 'Rogue', 'spritesheet' => asset('assets/default_heroes/hero-3.png'), 'health' => 120],
            ['name' => 'Paladin', 'spritesheet' => asset('assets/default_heroes/hero-3.png'), 'health' => 180],
            ['name' => 'Ranger', 'spritesheet' => asset('assets/default_heroes/hero-3.png'), 'health' => 130],
        ];

        foreach ($heroes as $hero) {
            Hero::create($hero);
        }
    }
}
