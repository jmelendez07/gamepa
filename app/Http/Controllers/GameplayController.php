<?php

namespace App\Http\Controllers;

use App\Models\Enemy;
use App\Models\Card;
use App\Models\Dificulty;
use App\Models\Exercise;
use App\Models\Galaxy;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class GameplayController extends Controller
{
    public function index()
    {
        $enemies = Enemy::raw(function ($collection) {
            return $collection->aggregate([
                ['$sample' => ['size' => 6]]
            ]);
        });

        // $skip = mt_rand(0, max(0, Card::count() - 8));
        // $cards = Card::with(['exercises.steps.options', 'type'])->skip($skip)->take(8)->get();

        $easy = Dificulty::where('name', 'Fácil')->first()->id;

        $hero = Auth::user()->heroes()->first();

        $heroCards = $hero->cards()->with('type')->get();

        $cards = [];
        
        foreach ($heroCards as $card) {
            $card->exercise = $this->randomExercise($easy);
            $cards[] = $card;
        }

        $galaxy = Galaxy::firstOrFail();

        return redirect()->route('gameplay.galaxy', $galaxy->id);

        // return Inertia::render('gameplay', [
        //     'enemies' => $enemies,
        //     'cards' => $cards,
        //     'hero' => $hero
        // ]);
    }

    public function galaxy($galaxyId)
    {
        $galaxy = Galaxy::with(['planets'])->findOrFail($galaxyId);
        
        return Inertia::render('gameplay/galaxies/show', [
            'galaxy' => $galaxy
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
