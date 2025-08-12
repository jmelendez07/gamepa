<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::inertia('/gameplay', 'gameplay')->name('gameplay');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware(['role:administrador'])->group(function () {
        Route::resource('users', UserController::class)->names('users');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
