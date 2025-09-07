<?php

namespace App\Http\Controllers;

use App\Models\Dificulty;
use App\Models\Exercise;
use App\Models\Planet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    public function index()
    {
        $exercises = Exercise::with(['planet', 'difficulty'])->orderByDesc('created_at')->get();
        $difficulties = Dificulty::all();
        $planets = Planet::all();

        return Inertia::render('dashboard/exercises/index', [
            'exercises' => $exercises,
            'difficulties' => $difficulties,
            'planets' => $planets
        ]);
    }

    public function create()
    {
        return redirect()->route('exercises.index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'operation' => 'required|string',
            'planet_id' => 'required|exists:planets,id',
            'difficulty_id' => 'required|exists:dificulties,id',
        ]);

        Exercise::create([
            'operation' => $request->operation,
            'planet_id' => $request->planet_id,
            'difficulty_id' => $request->difficulty_id,
        ]);

        return redirect()->route('exercises.index')->with('success', 'Ejercicio creado exitosamente.');
    }

    public function show($exerciseId)
    {
        return redirect()->route('exercises.index');
    }

    public function edit($exerciseId)
    {
        return redirect()->route('exercises.index');
    }

    public function update(Request $request, $exerciseId)
    {
        $exercise = Exercise::findOrFail($exerciseId);

        $request->validate([
            'operation' => 'required|string',
            'planet_id' => 'required|exists:planets,id',
            'difficulty_id' => 'required|exists:dificulties,id',
        ]);

        $exercise->update([
            'operation' => $request->operation,
            'planet_id' => $request->planet_id,
            'difficulty_id' => $request->difficulty_id,
        ]);

        return redirect()->route('exercises.index')->with('success', 'Ejercicio actualizado exitosamente.');
    }

    public function destroy($exerciseId)
    {
        $exercise = Exercise::findOrFail($exerciseId);
        $exercise->delete();

        return redirect()->route('exercises.index')->with('success', 'Ejercicio eliminado exitosamente.');
    }
}
