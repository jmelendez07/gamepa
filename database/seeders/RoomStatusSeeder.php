<?php

namespace Database\Seeders;

use App\Models\RoomStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomStatusSeeder extends Seeder
{
    public function run(): void
    {
        RoomStatus::truncate();
        
        $statuses = ['Borrador', 'En vivo', 'Completada'];

        foreach($statuses as $status) {
            RoomStatus::create([
                'name' => $status
            ]);
        }
    }
}
