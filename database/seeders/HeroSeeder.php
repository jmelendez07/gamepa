<?php

namespace Database\Seeders;

use App\Models\Card;
use App\Models\Hero;
use App\Models\HeroAnimations;
use App\Models\TypeCard;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HeroSeeder extends Seeder
{
    public function run(): void
    {
        Hero::truncate();
        Card::truncate();
        
        $this->createWarrior();
        $this->createNinja();
    }

    private function createWarrior(): void
    {
        $warrior = Hero::create([
            'name' => 'Warrior',
            'spritesheet' => asset('assets/default_heroes/hero-1.png'),
            'health' => 150
        ]);

        $types = TypeCard::where('name', 'Ataque')->first();
        
        for ($i = 0; $i < 8; $i++) {
            Card::factory()->create([
                'hero_id' => $warrior->id,
                'spritesheet' => asset('assets/cards/hero-1/card-hero-1.png'),
                'energy_cost' => rand(1, 2),
                'stats' => rand(10, 20),
                'type_card_id' => $types->id,
            ]);
        }

        HeroAnimations::factory()->create([
            'hero_id' => $warrior->id,
            'action' => 'attack',
            'spritesheet_url' => asset('assets/default_heroes/hero-1.png'),
            'row' => 64,
            'totalAnimationsFrames' => 8,
            'totalTilesFrames' => 21,
        ]);

        HeroAnimations::factory()->create([
            'hero_id' => $warrior->id,
            'action' => 'fighting',
            'spritesheet_url' => asset('assets/default_heroes/hero-1.png'),
            'row' => 45,
            'totalAnimationsFrames' => 2,
            'totalTilesFrames' => 2,
        ]);

        HeroAnimations::factory()->create([
            'hero_id' => $warrior->id,
            'action' => 'walk',
            'spritesheet_url' => asset('assets/default_heroes/hero-1.png'),
            'row' => 0,
            'totalAnimationsFrames' => 9,
            'totalTilesFrames' => 9,
        ]);
    }

    private function createNinja(): void
    {
        $ninja = Hero::create([
            'name' => 'Ninja',
            'spritesheet' => asset('assets/default_heroes/hero-4.png'),
            'health' => 100
        ]);

        $types = TypeCard::where('name', 'Ataque')->first();
        
        for ($i = 0; $i < 8; $i++) {
            Card::factory()->create([
                'hero_id' => $ninja->id,
                'spritesheet' => asset('assets/cards/hero-4/card-hero-4.png'),
                'energy_cost' => rand(1, 2),
                'stats' => rand(10, 20),
                'type_card_id' => $types->id,
            ]);
        }

        HeroAnimations::factory()->create([
            'hero_id' => $ninja->id,
            'action' => 'attack',
            'spritesheet_url' => asset('assets/default_heroes/hero-4.png'),
            'row' => 64,
            'totalAnimationsFrames' => 6,
            'totalTilesFrames' => 21,
        ]);

        HeroAnimations::factory()->create([
            'hero_id' => $ninja->id,
            'action' => 'fighting',
            'spritesheet_url' => asset('assets/default_heroes/hero-4.png'),
            'row' => 45,
            'totalAnimationsFrames' => 2,
            'totalTilesFrames' => 2,
        ]);

        HeroAnimations::factory()->create([
            'hero_id' => $ninja->id,
            'action' => 'walk',
            'spritesheet_url' => asset('assets/default_heroes/hero-4.png'),
            'row' => 0,
            'totalAnimationsFrames' => 9,
            'totalTilesFrames' => 9,
        ]);
    }
}
