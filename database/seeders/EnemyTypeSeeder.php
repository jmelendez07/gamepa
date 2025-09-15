<?php

namespace Database\Seeders;

use App\Models\EnemyType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EnemyTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['Minion', 'Normal', 'Elite', 'Boss'];

        foreach ($types as $type) {
            EnemyType::updateOrInsert(
                ['name' => $type], 
                [
                    'name' => $type,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
