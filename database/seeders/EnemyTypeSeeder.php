<?php

namespace Database\Seeders;

use App\Models\EnemyType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EnemyTypeSeeder extends Seeder
{
    public function run(): void
    {
        EnemyType::truncate();
        
        $types = ['Minion', 'Normal', 'Elite', 'Boss'];

        foreach ($types as $type) {
            EnemyType::updateOrInsert(
                ['name' => $type], 
                [
                    'name' => $type,
                    'reward_xp' => match($type) {
                        'Minion' => 10,
                        'Normal' => 20,
                        'Elite' => 50,
                        'Boss' => 100,
                        default => 0,
                    },
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
