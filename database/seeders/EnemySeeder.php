<?php

namespace Database\Seeders;

use App\Models\EnemyType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EnemySeeder extends Seeder
{
    public function run(): void
    {
        $types = EnemyType::all();
    }
}
