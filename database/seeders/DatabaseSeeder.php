<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            TypeCardSeeder::class,
            // CardSeeder::class,
            DificultySeeder::class,
            GalaxySeeder::class,
            PlanetSeeder::class,
            StageSeeder::class,
            // ExerciseSeeder::class,
            // StepSeeder::class,
            // OptionSeeder::class,
            EnemyTypeSeeder::class,
            EnemySeeder::class,
            HeroSeeder::class,
            RoomStatusSeeder::class,
            RoomSeeder::class,
            QuestionSeeder::class,
            AnswerSeeder::class,
        ]);
    }
}