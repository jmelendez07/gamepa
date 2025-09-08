<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EnemyController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/enemies/index', [
            
        ]);
    }
}
