<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomStatus;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::with(['status'])->get();

        return Inertia::render('board/rooms/index', [
            'rooms' => $rooms
        ]);
    }

    public function create()
    {
        return Inertia::render('board/rooms/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
        ]);

        $status = RoomStatus::where('name', 'Borrador')->firstOrFail();

        $room = Room::create([
            'name' => $request->name,
            'status_id' => $status->id,
            'teacher_id' => Auth::id(),
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
        ]);

        return redirect()->route('rooms.show', [$room->id])->with('success', 'Sala ' . $room->name . ' creada exitosamente.');
    }

    public function show($roomId)
    {
        $room = Room::with(['teacher', 'status', 'questions.answers'])->findOrFail($roomId);

        return Inertia::render('board/rooms/show', [
            'room' => $room
        ]);
    }

    public function edit(Room $room)
    {
        //
    }

    public function update(Request $request, Room $room)
    {
        return redirect()->back()->with('success', 'Sala ' . $room->name . ' actualizada exitosamente.');
    }

    public function destroy($roomId)
    {
        $room = Room::findOrFail($roomId);
        $roomName = $room->name;
        $room->delete();

        return redirect()->route('rooms.index')->with('success', 'Sala ' . $roomName . ' eliminada exitosamente.');
    }
}
