<?php

namespace App\Http\Controllers;

use App\Models\Enemy;
use App\Models\Card;
use App\Models\Dificulty;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class GameplayController extends Controller
{
    public function index()
    {
        $randomEnemies = Enemy::raw(function ($collection) {
            return $collection->aggregate([
                ['$sample' => ['size' => 6]],
                ['$project' => ['_id' => 1]],
            ]);
        });

        $enemyIds = [];
        foreach ($randomEnemies as $enemy) {
            $enemyIds[] = $enemy->_id ?? $enemy['_id'];
        }

        $enemies = Enemy::with('type')->whereIn('_id', $enemyIds)->get();

        $skip = mt_rand(0, max(0, Card::count() - 8));

        $easy = Dificulty::where('name', 'Fácil')->first()->id;

        $hero = Auth::user()->heroes()->first();

        $heroCards = $hero->cards()->with('type')->get();

        $cards = [];
        foreach ($heroCards as $card) {
            $card->exercise = $this->randomExercise($easy);
            $cards[] = $card;
        }

        return Inertia::render('gameplay', [
            'enemies' => $enemies,
            'cards' => $cards,
            'hero' => $hero
        ]);
    }

    public function randomExercise($difficultyId)
    {
        $exercises = Exercise::with('steps.options')
            ->where('difficulty_id', $difficultyId)
            ->get();

        return $exercises->random();
    }
}
