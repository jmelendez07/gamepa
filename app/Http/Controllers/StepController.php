<?php

namespace App\Http\Controllers;

use App\Models\Step;
use App\Models\Exercise;
use Illuminate\Http\Request;

class StepController extends Controller
{
    public function index()
    {
        abort(404);
    }

    public function create()
    {
        abort(404);
    }

    public function store(Request $request)
    {
        $request->validate([
            'exercise_id' => 'required|exists:exercises,id',
            'order' => 'required|integer',
        ]);

        $exercise = Exercise::findOrFail($request->exercise_id);

        $step = $exercise->steps()->create([
            'order' => $request->order,
        ]);

        return redirect()->back()->with('success', "Paso {$step->order} creado exitosamente.");
    }

    public function show($stepId)
    {
        abort(404);
    }

    public function edit($stepId)
    {
        abort(404);
    }

    public function update(Request $request, $stepId)
    {
        abort(404);
    }

    public function destroy($stepId)
    {
        $step = Step::findOrFail($stepId);

        $steps = Step::where('exercise_id', $step->exercise_id)
            ->where('order', '>', $step->order)
            ->orderBy('order')
            ->get();

        foreach ($steps as $s) {
            $s->decrement('order');
        }

        $step->delete();
        
        return redirect()->back()->with('success', "Paso {$step->order} eliminado exitosamente.");
    }
}
