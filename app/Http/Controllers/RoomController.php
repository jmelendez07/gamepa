<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Question;
use App\Models\Answer;
use App\Models\RoomStatus;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::where('teacher_id', Auth::id())->with(['status'])->get();

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
            'pin' => 'required|string|size:6|unique:rooms,pin',
            'questions' => 'required|array|min:1',
            'questions.*.text' => 'required|string|max:1000',
            'questions.*.answers' => 'required|array|size:4',
            'questions.*.answers.*.text' => 'required|string|max:500',
            'questions.*.answers.*.is_correct' => 'required|boolean',
        ]);

        foreach ($request->questions as $questionIndex => $question) {
            $correctAnswers = collect($question['answers'])->where('is_correct', true)->count();
            
            if ($correctAnswers !== 1) {
                return back()->withErrors([
                    "questions.{$questionIndex}.answers" => 'Cada pregunta debe tener exactamente una respuesta correcta.'
                ])->withInput();
            }
        }

        try {
            if (Room::where('pin', $request->pin)->first()) {
                return back()->withErrors([
                    'pin' => 'Este PIN ya está en uso. Genera uno nuevo.'
                ])->withInput();
            }

            $status = RoomStatus::where('name', 'Borrador')->firstOrFail();

            $room = Room::create([
                'name' => $request->name,
                'pin' => $request->pin,
                'status_id' => $status->_id,
                'teacher_id' => Auth::id(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $questionsCreated = 0;

            foreach ($request->questions as $questionData) {
                $question = Question::create([
                    'text' => $questionData['text'],
                    'room_id' => $room->_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                if ($question) {
                    $questionsCreated++;

                    foreach ($questionData['answers'] as $answerData) {
                        $answer = Answer::create([
                            'text' => $answerData['text'],
                            'is_correct' => $answerData['is_correct'],
                            'question_id' => $question->_id,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }

            return redirect()->route('rooms.show', $room->_id)->with('success', "Sala '{$room->name}' creada exitosamente con {$questionsCreated} preguntas.");
        } catch (\Exception $e) {
            Log::error('Error al crear sala: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Error al crear la sala. Inténtalo de nuevo.'])->withInput();
        }
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
