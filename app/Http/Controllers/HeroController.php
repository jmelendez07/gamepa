<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroController extends Controller
{
    public function index()
    {
        $heroes = Hero::orderByDesc('updated_at')->get();

        return Inertia::render('dashboard/heroes/index', [
            'heroes' => $heroes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:heroes,name',
            'spritesheet' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'health' => 'required|integer|min:1',
        ]);

        $hero = Hero::create([
            'name' => $request->name,
            'spritesheet' => asset('storage/' . $request->file('spritesheet')->store('heroes', 'public')),
            'health' => $request->health,
        ]);

        return redirect()->route('heroes.index')->with('success', 'Heroe ' . $hero->name . ' creado exitosamente.');
    }

    public function update(Request $request, $heroId)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:heroes,name,' . $heroId,
            'spritesheet' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'health' => 'required|integer|min:1',
        ]);

        $hero = Hero::findOrFail($heroId);
        $hero->update([
            'name' => $request->name,
            'spritesheet' => $request->file('spritesheet') ? asset('storage/' . $request->file('spritesheet')->store('heroes', 'public')) : $hero->spritesheet,
            'health' => $request->health,
        ]);

        return redirect()->route('heroes.index')->with('success', 'Heroe ' . $hero->name . ' actualizado exitosamente.');
    }

    public function destroy($heroId)
    {
        $hero = Hero::findOrFail($heroId);
        $hero->delete();

        return redirect()->route('heroes.index')->with('success', 'Heroe ' . $hero->name . ' eliminado exitosamente.');
    }
}
