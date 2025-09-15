<?php

namespace App\Http\Controllers;

use App\Models\Enemy;
use App\Models\Card;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class GameplayController extends Controller
{
    public function index()
    {
        $enemies = Enemy::raw(function($collection) {
            return $collection->aggregate([
                ['$sample' => ['size' => 6]]
            ]);
        });

        $skip = mt_rand(0, max(0, Card::count() - 8));
        $cards = Card::with(['exercises.steps.options', 'type'])->skip($skip)->take(8)->get();
        $hero = Auth::user()->heroes()->first();

        return Inertia::render('gameplay', [
            'enemies' => $enemies,
            'cards' => $cards,
            'hero' => $hero
        ]);
    }
}