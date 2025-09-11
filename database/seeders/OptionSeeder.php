<?php

namespace Database\Seeders;

use App\Models\Step;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OptionSeeder extends Seeder
{
    public function run(): void
    {
        $steps = Step::all();
        foreach ($steps as $step) {
            for ($i = 1; $i <= 4; $i++) {
                $step->options()->create([
                    'result' => 'Opción ' . $i . ' para el paso ' . $step->order . ($i === 1 ? ' - (correcta)' : ''),
                    'is_correct' => $i === 1,
                ]);
            }
        }
    }
}