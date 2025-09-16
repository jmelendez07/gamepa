<?php

use App\Models\User;
use App\Models\RoomStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('pin')->unique();
            $table->string('name');
            $table->foreignIdFor(RoomStatus::class, 'status_id')->constrained()->onDelete('cascade');
            $table->foreignIdFor(User::class, 'teacher_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
