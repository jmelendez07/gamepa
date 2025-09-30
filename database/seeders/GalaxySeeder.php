<?php

namespace Database\Seeders;

use App\Models\Galaxy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GalaxySeeder extends Seeder
{
    public function run(): void
    {
        Galaxy::truncate();
        
        $galaxies = [
            [
                'name' => 'Via Lactea',
                'number' => 1,
                'image_url' => 'https://res.cloudinary.com/dvibz13t8/image/upload/v1758347815/bg-galaxy_dn3jmx.png',
                'image_public_id' => 'bg-galaxy_dn3jmx'
            ]
        ];

        foreach ($galaxies as $galaxy) {
            Galaxy::create($galaxy);
        }
    }
}
