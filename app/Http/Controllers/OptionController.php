<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\Step;
use Illuminate\Http\Request;

class OptionController extends Controller
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
            'step_id' => 'required|exists:steps,id',
            'result' => 'required|string',
            'is_correct' => 'required|boolean'
        ]);

        $step = Step::findOrFail($request->step_id);
        $option = $step->options()->create([
            'result' => $request->result,
            'is_correct' => $request->is_correct ?? false,
        ]);

        return redirect()->back()->with('success', "Opción {$option->result} creada exitosamente.");
    }

    public function show($optionId)
    {
        abort(404);
    }

    public function edit($optionId)
    {
        abort(404);
    }

    public function update(Request $request, $optionId)
    {
        $request->validate([
            'result' => 'required|string',
            'is_correct' => 'required|boolean'
        ]);

        $option = Option::findOrFail($optionId);
        $option->update([
            'result' => $request->result,
            'is_correct' => $request->is_correct ?? false,
        ]);

        return redirect()->back()->with('success', "Opción {$option->result} actualizada exitosamente.");
    }

    public function destroy($optionId)
    {
        $option = Option::findOrFail($optionId);
        $option->delete();

        return redirect()->back()->with('success', "Opción {$option->result} eliminada exitosamente.");
    }
}
