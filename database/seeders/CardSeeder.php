<?php

namespace Database\Seeders;

use App\Models\Card;
use App\Models\TypeCard;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CardSeeder extends Seeder
{
    public function run(): void
    {
        $types = TypeCard::all();
        
        $cards = [
            ['name' => 'Fire Dragon', 'stats' => 45],
            ['name' => 'Water Spirit', 'stats' => 32],
            ['name' => 'Lightning Bolt', 'stats' => 28],
            ['name' => 'Earth Golem', 'stats' => 48],
            ['name' => 'Wind Hawk', 'stats' => 35],
            ['name' => 'Ice Shard', 'stats' => 22],
            ['name' => 'Shadow Wolf', 'stats' => 38],
            ['name' => 'Crystal Mage', 'stats' => 41],
            ['name' => 'Stone Guardian', 'stats' => 50],
            ['name' => 'Flame Warrior', 'stats' => 30],
            ['name' => 'Frost Giant', 'stats' => 47],
            ['name' => 'Storm Eagle', 'stats' => 25],
            ['name' => 'Dark Knight', 'stats' => 43],
            ['name' => 'Nature Sprite', 'stats' => 20],
            ['name' => 'Arcane Oracle', 'stats' => 36]
        ];

        foreach ($cards as $index => $cardData) {
            $energyCost = $cardData['stats'] > 40 ? 2 : 1;
            
            Card::create([
                'name' => $cardData['name'],
                'energy_cost' => $energyCost,
                'stats' => $cardData['stats'],
                'type_card_id' => $types[($index % $types->count())]->id
            ]);
        }
    }
}
