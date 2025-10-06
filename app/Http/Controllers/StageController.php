<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StageController extends Controller
{
    public $folder;

    public function __construct()
    {
        $this->folder = env('CLOUDINARY_FOLDER', 'gamepa');
    }

    public function index()
    {
        return redirect()->route('planets.index');
    }

    public function create()
    {
        return redirect()->route('planets.index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:stages|string|max:255',
            'planet_id' => 'required|exists:planets,id',
            'image' => 'required|image|max:5120',
        ]);

        $cloudinaryImage = cloudinary()->uploadApi()->upload($request->file('image')->getRealPath(), [
            'folder' => $this->folder . '/stages'
        ]);

        $stage = Stage::create([
            'name' => $request->name,
            'number' => Stage::max('number') + 1,
            'planet_id' => $request->planet_id,
            'image_url' => $cloudinaryImage['secure_url'],
            'image_public_id' => $cloudinaryImage['public_id'],
        ]);

        return redirect()->back()->with('success', 'Lugar ' . $stage->name . ' creado exitosamente.');
    }

    public function show(string $stageId)
    {
        $stage = Stage::with(['planet', 'points'])->findOrFail($stageId);

        return Inertia::render('dashboard/stages/show', [
            'stage' => $stage
        ]);
    }

    public function edit(string $id)
    {
        return redirect()->route('planets.index');
    }

    public function update(Request $request, $stageId)
    {
        $stage = Stage::findOrFail($stageId);

        $request->validate([
            'name' => 'required|string|max:255|unique:stages,name,' . $stage->id,
            'image' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('image')) {
            if ($stage->image_public_id) {
                cloudinary()->uploadApi()->destroy($stage->image_public_id);
            }

            $cloudinaryImage = cloudinary()->uploadApi()->upload($request->file('image')->getRealPath(), [
                'folder' => $this->folder . '/stages'
            ]);

            $stage->image_url = $cloudinaryImage['secure_url'];
            $stage->image_public_id = $cloudinaryImage['public_id'];
        }

        $stage->name = $request->name;
        $stage->save();

        return redirect()->back()->with('success', 'Lugar ' . $stage->name . ' actualizado exitosamente.');
    }

    public function destroy($stageId)
    {
        $stage = Stage::findOrFail($stageId);

        if ($stage->image_public_id) {
            cloudinary()->uploadApi()->destroy($stage->image_public_id);
        }

        foreach (Stage::where('number', '>', $stage->number)->get() as $s) {
            $s->number -= 1;
            $s->save();
        }

        $stage->delete();

        return redirect()->back()->with('success', 'Lugar ' . $stage->name . ' eliminado exitosamente.');
    }
}
