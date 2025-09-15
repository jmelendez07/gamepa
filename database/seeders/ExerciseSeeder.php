<?php

namespace Database\Seeders;

use App\Models\Dificulty;
use App\Models\Exercise;
use App\Models\Planet;
use App\Models\Card;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {
        $planets = Planet::all();
        $difficulties = Dificulty::all();
        $cards = Card::all();
        $cardIndex = 0;

        foreach ($planets as $planet) {
            foreach ($difficulties as $difficulty) {
                $exercise = Exercise::create([
                    'operation' => 'some operation',
                    'planet_id' => $planet->id,
                    'difficulty_id' => $difficulty->id,
                ]);

                $card = $cards[$cardIndex];
                $card->exercises()->attach($exercise);

                $cardIndex = ($cardIndex + 1) % count($cards);
            }
        }
    }
}
