<?php

namespace App\Http\Controllers;

use App\Models\Enemy;
use App\Models\Dificulty;
use App\Models\Exercise;
use App\Models\Galaxy;
use App\Models\Stage;
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
    }

    public function galaxy($galaxyId)
    {
        $galaxy = Galaxy::with(['planets.stages'])->findOrFail($galaxyId);
        $profile = Auth::user()->profile;
        
        return Inertia::render('gameplay/galaxies/show', [
            'galaxy' => $galaxy,
            'unlocked_planets' => $profile->unlockedPlanets,
            'unlocked_stages' => $profile->unlockedStages,
        ]);
    }

    public function stage($stageId)
    {
        $stage = Stage::findOrFail($stageId);
        $hero = Auth::user()->heroes()->with(['cards.type'])->firstOrFail();
        $easy = Dificulty::where('name', 'Fácil')->firstOrFail()->id;

        $enemies = [];

        $orcEnemy = Enemy::with('type')->where('name', 'Orc')->first();
        if ($orcEnemy) {
            $enemies[] = $orcEnemy;
        }

        $DragonEnemy = Enemy::with('type')->where('name', 'Dragon')->first();
        if ($DragonEnemy) {
            $enemies[] = $DragonEnemy;
        }

        // $enemies = Enemy::with('type')->limit(2)->get();

        $cards = [];

        foreach ($hero->cards as $card) {
            $card->exercise = $this->randomExercise($easy);
            $cards[] = $card;
        }
        
        return Inertia::render('gameplay/stages/show', [
            'stage' => $stage,
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
