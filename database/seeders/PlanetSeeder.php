<?php

namespace Database\Seeders;

use App\Models\Planet;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanetSeeder extends Seeder
{
    public function run(): void
    {
        $planets = [
            ['name' => 'Mercurio', 'description' => 'El planeta más cercano al sol.'],
            // ['name' => 'Venus', 'description' => 'El planeta más caliente del sistema solar.'],
            // ['name' => 'Tierra', 'description' => 'Nuestro hogar, el único planeta conocido con vida.'],
            // ['name' => 'Marte', 'description' => 'El planeta rojo, conocido por su superficie rocosa.'],
            // ['name' => 'Júpiter', 'description' => 'El gigante gaseoso más grande del sistema solar.'],
            // ['name' => 'Saturno', 'description' => 'Famoso por sus impresionantes anillos.'],
            // ['name' => 'Urano', 'description' => 'Un gigante helado con un eje de rotación único.'],
            // ['name' => 'Neptuno', 'description' => 'El planeta más lejano del sol en nuestro sistema solar.'],
        ];

        foreach ($planets as $planet) {
            Planet::factory()->create($planet);
        }
    }
}
