<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Room;
use App\Models\RoomStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $teachers = Role::where('name', 'docente')->firstOrFail()->users;
        $statuses = RoomStatus::all();

        foreach($teachers as $indexTeacher => $teacher) {
            foreach($statuses as $indexStatus => $status) {
                Room::create([
                    'pin' => $indexTeacher . 'A' . $indexStatus . 'B',
                    'name' => 'Sala numero ' . Room::count() + 1,
                    'teacher_id' => $teacher->id,
                    'status_id' => $status->id
                ]);
            }
        }
    }
}
