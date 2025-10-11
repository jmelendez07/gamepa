<?php

namespace Database\Seeders;

use App\Models\Mission;
use App\Models\Stage;
use App\Models\Planet;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Mission::truncate();

        // Obtener stages basados en el planeta al que pertenecen
        $planetEarth = Planet::where('name', 'Tierra')->first();
        $planetMercury = Planet::where('name', 'Mercurio')->first();
        $planetVenus = Planet::where('name', 'Venus')->first();
        $planetMars = Planet::where('name', 'Marte')->first();

        if ($planetEarth) {
            $stagesEarth = Stage::where('planet_id', $planetEarth->id)->get();
            $this->createMissionsForEarth($stagesEarth);
        }

        if ($planetMercury) {
            $stagesMercury = Stage::where('planet_id', $planetMercury->id)->get();
            $this->createMissionsForMercury($stagesMercury);
        }

        if ($planetVenus) {
            $stagesVenus = Stage::where('planet_id', $planetVenus->id)->get();
            $this->createMissionsForVenus($stagesVenus);
        }

        if ($planetMars) {
            $stagesMars = Stage::where('planet_id', $planetMars->id)->get();
            $this->createMissionsForMars($stagesMars);
        }
    }

    private function createMissionsForEarth($stages): void
    {
        $stages->where('name', 'Ciudad')->each(function ($stage) {
            Mission::create([
                'name' => 'Mision 1',
                'description' => 'Derrota a los enemigos en la ciudad.',
                'number_actions' => 2,
                'stage_id' => $stage->id,
            ]);
        });

        $stages->where('name', 'Ciudad Gotica')->each(function ($stage) {
            Mission::factory()->create([
                'name' => 'Mision 1',
                'description' => 'Derrota al Jefe Final del Planeta Tierra.',
                'number_actions' => 1,
                'stage_id' => $stage->id,
            ]);
        });
    }

    private function createMissionsForMercury($stages): void
    {
        $stages->where('name', 'Ciudad')->each(function ($stage) {
            Mission::factory()->create([
                'name' => 'Mision 1',
                'description' => 'Derrota a los enemigos en la ciudad.',
                'number_actions' => 4,
                'stage_id' => $stage->id,
            ]);
        });

        $stages->where('name', 'Ciudad Gotica')->each(function ($stage) {
            Mission::factory()->create([
                'name' => 'Mision 1',
                'description' => 'Derrota al Jefe Final del Planeta Mercurio.',
                'number_actions' => 1,
                'stage_id' => $stage->id,
            ]);
        });
    }

    private function createMissionsForVenus($stages): void
    {
        $stages->where('name', 'Ciudad')->each(function ($stage) {
            Mission::factory()->create([
                'name' => 'Mision 1',
                'description' => 'Derrota a los enemigos en la ciudad.',
                'number_actions' => 6,
                'stage_id' => $stage->id,
            ]);
        });

        $stages->where('name', 'Ciudad Gotica')->each(function ($stage) {
            Mission::factory()->create([
                'name' => 'Mision 1',
                'description' => 'Derrota al Jefe Final del Planeta Venus.',
                'number_actions' => 1,
                'stage_id' => $stage->id,
            ]);
        });
    }

    private function createMissionsForMars($stages): void
    {
        $stages->where('name', 'Ciudad')->each(function ($stage) {
            Mission::factory()->create([
                'name' => 'Mision 1',
                'description' => 'Derrota a los enemigos en la ciudad.',
                'number_actions' => 8,
                'stage_id' => $stage->id,
            ]);
        });

        $stages->where('name', 'Ciudad Gotica')->each(function ($stage) {
            Mission::factory()->create([
                'name' => 'Mision 1',
                'description' => 'Derrota al Jefe Final del Planeta Marte.',
                'number_actions' => 1,
                'stage_id' => $stage->id,
            ]);
        });
    }
}
