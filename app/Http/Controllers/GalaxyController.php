<?php

namespace App\Http\Controllers;

use App\Models\Galaxy;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalaxyController extends Controller
{
    public $folder;

    public function __construct()
    {
        $this->folder = env('CLOUDINARY_FOLDER', 'gamepa');
    }

    public function index()
    {
        $galaxies = Galaxy::all();
        return Inertia::render('dashboard/galaxies/index', [
            'galaxies' => $galaxies
        ]);
    }

    public function create()
    {
        return redirect()->route('galaxies.index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:galaxies,name',
            'image' => 'required|image|max:2048',
        ]);

        $cloudinaryImage = cloudinary()->uploadApi()->upload($request->file('image')->getRealPath(), [
            'folder' => $this->folder . '/galaxies'
        ]);

        $galaxy = Galaxy::create([
            'name' => $request->name,
            'number' => Galaxy::max('number') + 1,
            'image_url' => $cloudinaryImage['secure_url'],
            'image_public_id' => $cloudinaryImage['public_id'],
        ]);

        return redirect()->route('galaxies.index')->with('success', 'Galaxia ' . $galaxy->name . ' creada exitosamente.');
    }

    public function show($galaxyId)
    {
        return redirect()->route('galaxies.index');
    }

    public function edit($galaxyId)
    {
        return redirect()->route('galaxies.index');
    }

    public function update(Request $request, $galaxyId)
    {
        $galaxy = Galaxy::findOrFail($galaxyId);

        $request->validate([
            'name' => 'required|max:255|unique:galaxies,name,' . $galaxy->_id,
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            
            if ($galaxy->image_public_id) {
                cloudinary()->uploadApi()->destroy($galaxy->image_public_id);
            }

            $cloudinaryImage = cloudinary()->uploadApi()->upload($request->file('image')->getRealPath(), [
                'folder' => $this->folder . '/galaxies'
            ]);
            $galaxy->image_url = $cloudinaryImage['secure_url'];
            $galaxy->image_public_id = $cloudinaryImage['public_id'];
        }

        $galaxy->name = $request->name;
        $galaxy->save();

        return redirect()->route('galaxies.index')->with('success', 'Galaxia ' . $galaxy->name . ' actualizada exitosamente.');
    }

    public function destroy($galaxyId)
    {
        $galaxy = Galaxy::findOrFail($galaxyId);

        if ($galaxy->image_public_id) {
            cloudinary()->uploadApi()->destroy($galaxy->image_public_id);
        }

        foreach (Galaxy::where('number', '>', $galaxy->number)->get() as $g) {
            $g->number -= 1;
            $g->save();
        }

        $galaxy->delete();

        return redirect()->route('galaxies.index')->with('success', 'Galaxia ' . $galaxy->name . ' eliminada exitosamente.');
    }
}
