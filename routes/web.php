<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PlanetController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\EnemyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::inertia('/gameplay', 'gameplay')->name('gameplay');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['role:administrador'])->group(function () {
        Route::get('panel', function () { return Inertia::render('dashboard'); })->name('dashboard');
        Route::resource('users', UserController::class)->names('users');
        Route::resource('planetas', PlanetController::class)->names('planets');
        Route::resource('ejercicios', ExerciseController::class)->names('exercises');
        Route::resource('cartas', CardController::class)->names('cards');
        Route::resource('pasos', StepController::class)->names('steps');
        Route::resource('opciones', OptionController::class)->names('options');
        Route::resource('enemigos', EnemyController::class)->names('enemies');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';