<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StepSeeder extends Seeder
{
    public function run(): void
    {
        $exercises = Exercise::all();
        foreach ($exercises as $exercise) {
            for ($i = 1; $i <= 3; $i++) {
                $exercise->steps()->create([
                    'order' => $i,
                ]);
            }
        }
    }
}