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
            JobSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            HeroRoleSeeder::class,
            LevelSeeder::class,
            TypeCardSeeder::class,
            DificultySeeder::class,
            GalaxySeeder::class,
            PlanetSeeder::class,
            StageSeeder::class,
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