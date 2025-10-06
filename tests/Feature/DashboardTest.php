<?php

use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Facades\DB;

beforeEach(function () {
    DB::connection('mongodb')->getMongoDB()->drop();

    $this->seed([
        RoleSeeder::class,
    ]);
});

test('guests are redirected to the login page', function () {
    $this->get('/panel')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $user->assignRole('administrador');
    $this->actingAs($user);

    $this->get('/panel')->assertOk();
});