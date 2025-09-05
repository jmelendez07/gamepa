<?php

namespace Database\Seeders;

use App\Models\TypeCard;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeCardSeeder extends Seeder
{
    public function run(): void
    {
        $typeCards = ['Ataque', 'Defensa', 'Curación', 'Potenciación'];

        foreach ($typeCards as $type) {
            TypeCard::updateOrInsert(
                ['name' => $type],
                [
                    'name' => $type,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
