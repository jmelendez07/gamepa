<?php

namespace Database\Seeders;

use App\Models\Planet;
use App\Models\Stage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StageSeeder extends Seeder
{
    public function run(): void
    {
        Stage::truncate();
        
        $planets = Planet::orderBy('number')->get();
        $stages = [
            [
                'name' => 'Ciudad', 
                'image_url' => 'https://res.cloudinary.com/dvibz13t8/image/upload/v1758664494/bg-gamepa-test_bzm76a.png',
                'image_public_id' => 'bg-gamepa-test_bzm76a'
            ],
            [
                'name' => 'Ciudad Gotica ', 
                'image_url' => 'https://res.cloudinary.com/dvibz13t8/image/upload/v1758833733/stage-2-map_vbxyvi.webp',
                'image_public_id' => 'stage-2-map_vbxyvi'
            ],
        ];

        foreach ($planets as $planet) {
            foreach ($stages as $stage) {
                $planet->stages()->create([
                    ...$stage,
                    'number' => Stage::max('number') + 1,
                ]);
            } 
        } 
    }
}
