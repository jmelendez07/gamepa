<?php

use App\Models\Dificulty;
use App\Models\Planet;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->string('operation');
            $table->foreignIdFor(Planet::class)->constrained()->onDelete('set null');
            $table->foreignIdFor(Dificulty::class)->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};