<?php

namespace Database\Factories;

use App\Models\Dificulty;
use App\Models\Exercise;
use App\Models\Galaxy;
use App\Models\Option;
use App\Models\Step;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Planet>
 */
class PlanetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [];
    }

    public function configure()
    {
        return $this->afterCreating(function ($planet) {
            $planet->galaxy()->associate(Galaxy::firstOrFail());
            $easy = Dificulty::where('name', 'Fácil')->first();
            $medium = Dificulty::where('name', 'Media')->first();
            $hard = Dificulty::where('name', 'Difícil')->first();

            // Ejercicios para nivel fácil
            $this->makeExercise1($easy->id, $planet->id);
            $this->makeExercise2($easy->id, $planet->id);
            $this->makeExercise3($easy->id, $planet->id);
            $this->makeExercise4($easy->id, $planet->id);
        });
    }

    public function makeExercise1($dificultyId, $planetId)
    {
        $exercise = Exercise::factory()->create([
            'operation' => "f'(x) = 3x + 5",
            'planet_id' => $planetId,
            'difficulty_id' => $dificultyId
        ]);

        $step1 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 1,
            'description' => 'Multiplicar los coeficientes segun las reglas de derivacion'
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '3(0) + 5(1)',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '3(1) + 5(0)',
            'is_correct' => true
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '3(1) + 5(1)',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '3(0) + 5(0)',
            'is_correct' => false
        ]);

        $step2 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 2,
            'description' => 'Resolver la multiplicacion'
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '3 + 0',
            'is_correct' => true
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '0 + 5',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '3 + 5',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '0 + 0',
            'is_correct' => false
        ]);

        $step3 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 3,
            'description' => 'Sumar los terminos'
        ]);
        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 5",
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 8",
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 3",
            'is_correct' => true
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 0",
            'is_correct' => false
        ]);
    }

    public function makeExercise2($dificultyId, $planetId)
    {
        $exercise = Exercise::factory()->create([
            'operation' => "f'(x) = 2x + 4",
            'planet_id' => $planetId,
            'difficulty_id' => $dificultyId
        ]);

        $step1 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 1,
            'description' => 'Multiplicar los coeficientes segun las reglas de derivacion'
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '2(0) + 4(1)',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '2(0) + 4(0)',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '2(1) + 4(0)',
            'is_correct' => true
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => 'x + 4(0)',
            'is_correct' => false
        ]);

        $step2 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 2,
            'description' => 'Resolver la multiplicacion'
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '2 + 0',
            'is_correct' => true
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '0 + 4',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '2 + 4',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '0 + 0',
            'is_correct' => false
        ]);

        $step3 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 3,
            'description' => 'Sumar los terminos'
        ]);
        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 4",
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 0",
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = x",
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 2",
            'is_correct' => true
        ]);
    }

    public function makeExercise3($dificultyId, $planetId)
    {
        $exercise = Exercise::factory()->create([
            'operation' => "f'(x) = x^2",
            'planet_id' => $planetId,
            'difficulty_id' => $dificultyId
        ]);

        $step1 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 1,
            'description' => 'Aplicar la regla de la potencia'
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '2x^(2-1)',
            'is_correct' => true
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '2x^(2+1)',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => 'x^(2-1)',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => 'x^(2+2)',
            'is_correct' => false
        ]);

        $step2 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 2,
            'description' => 'Simplificar la expresion'
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '2x^1',
            'is_correct' => true
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '2x^2',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => 'x^1',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => 'x^2',
            'is_correct' => false
        ]);

        $step3 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 3,
            'description' => 'Escribir la respuesta final'
        ]);
        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 1",
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 2x",
            'is_correct' => true
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = x",
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = x^2",
            'is_correct' => false
        ]);
    }

    public function makeExercise4($dificultyId, $planetId)
    {
        $exercise = Exercise::factory()->create([
            'operation' => "f'(x) = 2x^2",
            'planet_id' => $planetId,
            'difficulty_id' => $dificultyId
        ]);

        $step1 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 1,
            'description' => 'Aplicar la regla de la potencia'
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '2*2x^(2+1)',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '2x^(2-1)',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '2x^(2+2)',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step1->id,
            'result' => '2*2x^(2-1)',
            'is_correct' => true
        ]);

        $step2 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 2,
            'description' => 'Simplificar la expresion'
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '4x^1',
            'is_correct' => true
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '2x^2',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '2x^1',
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step2->id,
            'result' => '4x^2',
            'is_correct' => false
        ]);

        $step3 = Step::factory()->create([
            'exercise_id' => $exercise->id,
            'order' => 3,
            'description' => 'Escribir la respuesta final'
        ]);
        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 2x",
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 4x",
            'is_correct' => true
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = x^2",
            'is_correct' => false
        ]);

        Option::factory()->create([
            'step_id' => $step3->id,
            'result' => "F'(x) = 2x^2",
            'is_correct' => false
        ]);
    }
}
