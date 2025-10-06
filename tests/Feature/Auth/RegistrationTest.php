<?php

use Database\Seeders\DificultySeeder;
use Illuminate\Support\Facades\DB;
use Database\Seeders\RoleSeeder;
use Database\Seeders\LevelSeeder;
use Database\Seeders\PlanetSeeder;
use Database\Seeders\StageSeeder;
use Database\Seeders\GalaxySeeder;

beforeEach(function () {
    DB::connection('mongodb')->getMongoDB()->drop();

    $this->seed([
        RoleSeeder::class,
        LevelSeeder::class,
        DificultySeeder::class,
        GalaxySeeder::class,
        PlanetSeeder::class,
        StageSeeder::class,
    ]);
});

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post('/register', [
        'name' => 'Register Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('heroes.options', absolute: false));
});