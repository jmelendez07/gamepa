<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use Illuminate\Http\Request;

class StageVectorPointController extends Controller
{
    public function syncMany(string $stageId, Request $request) 
    {
        $stage = Stage::findOrFail($stageId);

        $request->validate([
            'points' => 'required|array',
            'points.*.x' => 'required|numeric',
            'points.*.y' => 'required|numeric',
        ]);

        $stage->points()->delete();       

        foreach ($request->input('points') as $index => $point) {
            $stage->points()->create([
                'x' => $point['x'],
                'y' => $point['y'],
                'number' => $index + 1,
            ]);
        }

        return redirect()->back()->with(['success' => 'Puntos vectoriales sincronizados correctamente.']);
    }
}
