<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PlanetController;
use App\Http\Controllers\ExerciseController;
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
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';