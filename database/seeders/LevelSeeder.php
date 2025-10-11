<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    public function run(): void
    {
        Level::truncate();

        $xpRequired = 0;
        for ($i = 1; $i <= 50; $i++) {
            if ($i === 1) {
                $xpRequired = 0;
                $nextLevelXp = 40;
            } elseif ($i === 2) {
                $xpRequired = 40;
                $nextLevelXp = 80;
            } else {
                $xpRequired *= 2;
                $nextLevelXp = $xpRequired * 2;
            }

            Level::create([
                'order' => $i,
                'xp_required' => $xpRequired,
                'next_level_xp' => $nextLevelXp,
            ]);
        }
    }
}
