<?php

use App\Models\Planet;
use App\Models\EnemyType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enemies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('spritesheet');
            $table->integer('health');
            $table->boolean('is_hostile')->default(true);
            $table->integer('basick_attack');
            $table->foreignIdFor(Planet::class)->constrained()->onDelete('set null')->nullable();
            $table->foreignIdFor(EnemyType::class)->constrained()->onDelete('set null')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enemies');
    }
};
