<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnswerSeeder extends Seeder
{
    public function run(): void
    {
        $answers = [
            [
                'answer_text' => 'Paris',
                'is_correct' => true,
                'question_text' => 'What is the capital of France?',
            ],
            [
                'answer_text' => 'London',
                'is_correct' => false,
                'question_text' => 'What is the capital of France?',
            ],
            [
                'answer_text' => '4',
                'is_correct' => true,
                'question_text' => 'What is 2 + 2?',
            ],
            [
                'answer_text' => '3',
                'is_correct' => false,
                'question_text' => 'What is 2 + 2?',
            ],
            [
                'answer_text' => 'Jupiter',
                'is_correct' => true,
                'question_text' => 'What is the largest planet in our solar system?',
            ],
            [
                'answer_text' => 'Mars',
                'is_correct' => false,
                'question_text' => 'What is the largest planet in our solar system?',
            ],
            [
                'answer_text' => 'Harper Lee',
                'is_correct' => true,
                'question_text' => 'Who wrote "To Kill a Mockingbird"?',
            ],
            [
                'answer_text' => 'Mark Twain',
                'is_correct' => false,
                'question_text' => 'Who wrote "To Kill a Mockingbird"?',
            ],
            [
                'answer_text' => 'cos(x)',
                'is_correct' => true,
                'question_text' => 'What is the derivative of sin(x)?',
            ],
            [
                'answer_text' => '-sin(x)',
                'is_correct' => false,
                'question_text' => 'What is the derivative of sin(x)?',
            ],
            [
                'answer_text' => 'Au',
                'is_correct' => true,
                'question_text' => 'What is the chemical symbol for gold?',
            ],
            [
                'answer_text' => 'Ag',
                'is_correct' => false,
                'question_text' => 'What is the chemical symbol for gold?',
            ],
        ];

        foreach ($answers as $answer) {
            $question = Question::where('text', $answer['question_text'])->first();
            if ($question) {
                $question->answers()->create([
                    'text' => $answer['answer_text'],
                    'is_correct' => $answer['is_correct'],
                ]);
            }
        }
    }
}
