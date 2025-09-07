<?php

namespace Database\Seeders;

use App\Models\Dificulty;
use App\Models\Exercise;
use App\Models\Planet;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {
        $planets = Planet::all();
        $difficulties = Dificulty::all();

        foreach ($planets as $planet) {
            foreach ($difficulties as $difficulty) {
                Exercise::create([
                    'operation' => 'some operation',
                    'planet_id' => $planet->id,
                    'difficulty_id' => $difficulty->id,
                ]);
            }
        }
    }
}
