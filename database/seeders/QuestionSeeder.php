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
                'text' => 'What is the capital of France?',
            ],
            [
                'text' => 'What is 2 + 2?',
            ],
            [
                'text' => 'What is the largest planet in our solar system?',
            ],
            [
                'text' => 'Who wrote "To Kill a Mockingbird"?',
            ],
            [
                'text' => 'What is the derivative of sin(x)?',
            ],
            [
                'text' => 'What is the chemical symbol for gold?',
            ],
        ];

        foreach ($rooms as $room) {
            foreach ($questions as $question) {
                $room->questions()->create($question);
            }
        }
    }
}
