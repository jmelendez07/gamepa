<?php

use App\Models\Hero;
use App\Models\TypeCard;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('energy_cost');
            $table->integer('stats');
            $table->string('spritesheet');
            $table->foreignIdFor(TypeCard::class)->constrained()->onDelete('set null');
            $table->foreignIdFor(Hero::class)->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
