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

    public function edit($roomId)
    {
        $room = Room::with(['status', 'questions.answers'])->findOrFail($roomId);

        return Inertia::render('board/rooms/edit', [
            'room' => $room
        ]);
    }

    public function update(Request $request, $roomId)
    {
        $request->validate([
            'name' => 'required|string|max:255',
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
            $room = Room::findOrFail($roomId);
            
            if ($room->teacher_id !== Auth::id()) {
                return back()->withErrors(['error' => 'No tienes permisos para editar esta sala.'])->withInput();
            }

            $room->update([
                'name' => $request->name,
                'updated_at' => now(),
            ]);

            $existingQuestions = Question::where('room_id', $room->_id)->get();
            $existingQuestionIds = $existingQuestions->pluck('_id')->toArray();
            $updatedQuestionIds = [];

            foreach ($request->questions as $questionData) {
                if (isset($questionData['id']) && in_array($questionData['id'], $existingQuestionIds)) {
                    $question = Question::find($questionData['id']);
                    $question->update([
                        'text' => $questionData['text'],
                        'updated_at' => now(),
                    ]);
                    $updatedQuestionIds[] = $questionData['id'];

                    $existingAnswers = Answer::where('question_id', $question->_id)->get();
                    $existingAnswerIds = $existingAnswers->pluck('_id')->toArray();
                    $updatedAnswerIds = [];

                    foreach ($questionData['answers'] as $answerData) {
                        if (isset($answerData['id']) && in_array($answerData['id'], $existingAnswerIds)) {
                            $answer = Answer::find($answerData['id']);
                            $answer->update([
                                'text' => $answerData['text'],
                                'is_correct' => $answerData['is_correct'],
                                'updated_at' => now(),
                            ]);
                            $updatedAnswerIds[] = $answerData['id'];
                        } else {
                            $answer = Answer::create([
                                'text' => $answerData['text'],
                                'is_correct' => $answerData['is_correct'],
                                'question_id' => $question->_id,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                            $updatedAnswerIds[] = $answer->_id;
                        }
                    }

                    $answersToDelete = array_diff($existingAnswerIds, $updatedAnswerIds);
                    if (!empty($answersToDelete)) {
                        Answer::whereIn('_id', $answersToDelete)->delete();
                    }

                } else {
                    $question = Question::create([
                        'text' => $questionData['text'],
                        'room_id' => $room->_id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    $updatedQuestionIds[] = $question->_id;

                    foreach ($questionData['answers'] as $answerData) {
                        Answer::create([
                            'text' => $answerData['text'],
                            'is_correct' => $answerData['is_correct'],
                            'question_id' => $question->_id,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }

            $questionsToDelete = array_diff($existingQuestionIds, $updatedQuestionIds);
            if (!empty($questionsToDelete)) {
                foreach ($questionsToDelete as $questionId) {
                    Answer::where('question_id', $questionId)->delete();
                }
                Question::whereIn('_id', $questionsToDelete)->delete();
            }

            $totalQuestions = count($request->questions);

            return redirect()->route('rooms.show', $room->_id)->with('success', "Sala '{$room->name}' actualizada exitosamente con {$totalQuestions} preguntas.");
        } catch (\Exception $e) {
            \Log::error('Error al actualizar sala: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Error al actualizar la sala. Inténtalo de nuevo.'])->withInput();
        }
    }

    public function destroy($roomId)
    {
        $room = Room::findOrFail($roomId);
        $roomName = $room->name;
        $room->delete();

        return redirect()->route('rooms.index')->with('success', 'Sala ' . $roomName . ' eliminada exitosamente.');
    }

    public function join($pin)
    {
        $room = Room::where('pin', $pin)->firstOrFail();
        
        return Inertia::render('board/rooms/join', [
            'room' => $room
        ]);
    }
}
