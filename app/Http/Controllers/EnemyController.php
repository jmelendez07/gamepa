<?php

namespace App\Http\Controllers;

use App\Models\Enemy;
use App\Models\Planet;
use App\Models\EnemyType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnemyController extends Controller
{
    public function index()
    {
        $enemies = Enemy::with(['type', 'planet'])->orderBy('created_at', 'desc')->get();
        $planets = Planet::all();
        $types = EnemyType::all();

        return Inertia::render('dashboard/enemies/index', [
            'enemies' => $enemies,
            'planets' => $planets,
            'types' => $types
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'spritesheet' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'health' => 'required|integer|min:1',
            'is_hostile' => 'required|boolean',
            'basic_attack' => 'required|integer|min:1',
            'planet_id' => 'required|exists:planets,id',
            'enemy_type_id' => 'required|exists:enemy_types,id',
        ]);

        $enemy = Enemy::create([
            'name' => $request->name,
            'spritesheet' => asset($request->file('spritesheet')->store('enemies', 'public')),
            'health' => $request->health,
            'is_hostile' => $request->is_hostile,
            'basic_attack' => $request->basic_attack,
            'planet_id' => $request->planet_id,
            'enemy_type_id' => $request->enemy_type_id,
        ]);

        return redirect()->back()->with('success', "Enemigo {$enemy->name} creado exitosamente.");
    }

    public function update(Request $request, $enemyId)
    {
        $enemy = Enemy::findOrFail($enemyId);

        $request->validate([
            'name' => 'required|string|max:255',
            'spritesheet' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'health' => 'required|integer|min:1',
            'is_hostile' => 'required|boolean',
            'basic_attack' => 'required|integer|min:1',
            'planet_id' => 'required|exists:planets,id',
            'enemy_type_id' => 'required|exists:enemy_types,id',
        ]);

        $enemy->update([
            'name' => $request->name,
            'spritesheet' => $request->file('spritesheet') ? asset($request->file('spritesheet')->store('enemies', 'public')) : $enemy->spritesheet,
            'health' => $request->health,
            'is_hostile' => $request->is_hostile,
            'basic_attack' => $request->basic_attack,
            'planet_id' => $request->planet_id,
            'enemy_type_id' => $request->enemy_type_id,
        ]);

        return redirect()->back()->with('success', "Enemigo {$enemy->name} actualizado exitosamente.");
    }

    public function destroy($enemyId)
    {
        $enemy = Enemy::findOrFail($enemyId);
        $enemy->delete();

        return redirect()->back()->with('success', "Enemigo eliminado exitosamente.");
    }
}
