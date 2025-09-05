<?php

namespace Database\Seeders;

use App\Models\Dificulty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DificultySeeder extends Seeder
{
    public function run(): void
    {
        $dificulties = ['Fácil', 'Media', 'Difícil'];

        foreach ($dificulties as $dificulty) {
            Dificulty::updateOrInsert(
                ['name' => $dificulty],
                [
                    'name' => $dificulty,
                    'created_at' => now(),
                    'updated_at' => now()
                ]
            );
        }
    }
}
