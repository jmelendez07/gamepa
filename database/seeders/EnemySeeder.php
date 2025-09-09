<?php

namespace Database\Seeders;

use App\Models\EnemyType;
use App\Models\Enemy;
use App\Models\Planet;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EnemySeeder extends Seeder
{
    public function run(): void
    {
        $types = EnemyType::all();
        $planets = Planet::all();

        $enemies = [
            [
                'name' => 'Goblin',
                'health' => 50,
                'basic_attack' => 10,
                'spritesheet' => asset('assets/generic-enemy.png'),
            ],
            [
                'name' => 'Orc',
                'health' => 80,
                'basic_attack' => 15,
                'spritesheet' => asset('assets/generic-enemy.png'),
            ],
            [
                'name' => 'Troll',
                'health' => 120,
                'basic_attack' => 20,
                'spritesheet' => asset('assets/generic-enemy.png'),
            ],
            [
                'name' => 'Dragon',
                'health' => 300,
                'basic_attack' => 50,
                'spritesheet' => asset('assets/generic-enemy.png'),
            ],
        ];

        foreach ($enemies as $enemy) {
            foreach ($planets as $planet) {
                foreach ($types as $type) {
                    Enemy::create([
                        'name' => $enemy['name'],
                        'spritesheet' => $enemy['spritesheet'],
                        'health' => $enemy['health'],
                        'is_hostile' => true,
                        'basic_attack' => $enemy['basic_attack'],
                        'planet_id' => $planet->id,
                        'enemy_type_id' => $type->id,
                    ]);       
                }
            }
        }
    }
}
