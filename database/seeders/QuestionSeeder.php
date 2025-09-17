<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = Room::all();
        $questions = [
            [
                'question_text' => 'What is the capital of France?',
            ],
            [
                'question_text' => 'What is 2 + 2?',
            ],
            [
                'question_text' => 'What is the largest planet in our solar system?',
            ],
            [
                'question_text' => 'Who wrote "To Kill a Mockingbird"?',
            ],
            [
                'question_text' => 'What is the derivative of sin(x)?',
            ],
            [
                'question_text' => 'What is the chemical symbol for gold?',
            ],
        ];

        foreach ($rooms as $room) {
            foreach ($questions as $question) {
                $room->questions()->create($question);
            }
        }
    }
}
