<?php

namespace Database\Seeders;

use App\Models\Planet;
use App\Models\Galaxy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanetSeeder extends Seeder
{
    public function run(): void
    {
        $galaxies = Galaxy::all();
        $planets = [
            [
                'name' => 'Tierra', 
                'description' => 'Nuestro hogar, el único planeta conocido con vida.',
                'image_url' => 'https://res.cloudinary.com/dvibz13t8/image/upload/v1758646374/planeta_1_liwvp0.png',
                'image_public_id' => 'planeta_1_liwvp0'
            ],
            [
                'name' => 'Mercurio', 
                'description' => 'El planeta más cercano al sol.',
                'image_url' => 'https://res.cloudinary.com/dvibz13t8/image/upload/v1758646375/planeta_2_ysvly2.png',
                'image_public_id' => 'planeta_2_ysvly2'
            ],
            [
                'name' => 'Venus', 
                'description' => 'El planeta más caliente del sistema solar.',
                'image_url' => 'https://res.cloudinary.com/dvibz13t8/image/upload/v1758664287/planeta_4_rrmt8r.png',
                'image_public_id' => 'planeta_4_rrmt8r'
            ],
            [
                'name' => 'Marte', 
                'description' => 'El planeta rojo, conocido por su superficie rocosa.',
                'image_url' => 'https://res.cloudinary.com/dvibz13t8/image/upload/v1758664287/planeta_3_vo5avg.png',
                'image_public_id' => 'planeta_3_vo5avg'
            ],
            // ['name' => 'Júpiter', 'description' => 'El gigante gaseoso más grande del sistema solar.'],
            // ['name' => 'Saturno', 'description' => 'Famoso por sus impresionantes anillos.'],
            // ['name' => 'Urano', 'description' => 'Un gigante helado con un eje de rotación único.'],
            // ['name' => 'Neptuno', 'description' => 'El planeta más lejano del sol en nuestro sistema solar.'],
        ];

        foreach($galaxies as $galaxy) {
            foreach ($planets as $planet) {
                Planet::factory()->create([
                    ...$planet,
                    'number' => Planet::max('number') + 1,
                    'galaxy_id' => $galaxy->id
                ]);
            }
        }
    }
}
