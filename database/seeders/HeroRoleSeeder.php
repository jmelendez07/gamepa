<?php

namespace Database\Seeders;

use App\Models\Hero;
use App\Models\HeroRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HeroRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HeroRole::truncate();

        $heroRoles = [
            [
                'name' => 'Escudero',
                'description' => 'Un héroe que protege a sus aliados con escudos y defensa robusta.',
                'icon_url' => 'https://res.cloudinary.com/dvibz13t8/image/upload/v1759276760/escudo_enxqze.png'
            ],
            [
                'name' => 'Curandero',
                'description' => 'Un héroe que se especializa en curar y apoyar a sus aliados.',
                'icon_url' => 'https://res.cloudinary.com/dvibz13t8/image/upload/v1759276745/curandero_rcunf2.png'
            ],
            [
                'name' => 'DPS',
                'description' => 'Un héroe que inflige gran daño a los enemigos con ataques poderosos.',
                'icon_url' => 'https://res.cloudinary.com/dvibz13t8/image/upload/v1759276778/espada_lnurwe.png'
            ]
        ];

        foreach ($heroRoles as $role) {
            HeroRole::updateOrInsert(
                ['name' => $role['name']],
                [
                    'name' => $role['name'],
                    'description' => $role['description'],
                    'icon_url' => $role['icon_url'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]
            );
        }
    }
}
