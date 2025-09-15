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
            ['name' => 'Warrior', 'spritesheet' => asset('assets/hero.png'), 'health' => 150],
            ['name' => 'Mage', 'spritesheet' => asset('assets/hero.png'), 'health' => 100],
            ['name' => 'Rogue', 'spritesheet' => asset('assets/hero.png'), 'health' => 120],
            ['name' => 'Paladin', 'spritesheet' => asset('assets/hero.png'), 'health' => 180],
            ['name' => 'Ranger', 'spritesheet' => asset('assets/hero.png'), 'health' => 130],
        ];

        foreach ($heroes as $hero) {
            Hero::create($hero);
        }
    }
}
