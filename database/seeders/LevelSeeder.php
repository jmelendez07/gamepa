<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $xpRequired = 0;

        for ($i = 1; $i <= 50; $i++) {
            if ($i === 1) {
                $xpRequired = 0; // Nivel 1 no requiere XP
            } elseif ($i === 2) {
                $xpRequired = 40; // Nivel 2 requiere 400 XP
            } else {
                $xpRequired *= 2; // Los siguientes niveles duplican el XP del anterior
            }

            Level::create([
                'order' => $i,
                'xp_required' => $xpRequired,
            ]);
        }
    }
}
