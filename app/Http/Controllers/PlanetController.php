<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Planet;
use Illuminate\Http\Request;

class PlanetController extends Controller
{
    public function index()
    {
        $planets = Planet::orderByDesc('created_at')->get();

        return Inertia::render('dashboard/planets/index', [
            'planets' => $planets
        ]);
    }

    public function create()
    {
        return redirect()->route('planets.index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:planets|string|max:255',
            'description' => 'nullable|string',
        ]);

        Planet::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('planets.index')->with('success', 'Planeta creado exitosamente.');
    }

    public function show($planetId)
    {
        return redirect()->route('planets.index');
    }

    public function edit($planetId)
    {
        return redirect()->route('planets.index');
    }

    public function update(Request $request, $planetId)
    {
        $planet = Planet::findOrFail($planetId);

        $request->validate([
            'name' => 'required|string|max:255|unique:planets,name,' . $planet->id,
            'description' => 'nullable|string',
        ]);

        $planet->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('planets.index')->with('success', 'Planeta actualizado exitosamente.');
    }

    public function destroy($planetId)
    {
        $planet = Planet::findOrFail($planetId);
        $planet->delete();

        return redirect()->route('planets.index')->with('success', 'Planeta eliminado exitosamente.');
    }
}
