<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::truncate();
        
        $roles = [
            [
                'name' => 'administrador',
                'guard_name' => 'web',
            ],
            [
                'name' => 'docente',
                'guard_name' => 'web',
            ],
            [
                'name' => 'estudiante',
                'guard_name' => 'web',
            ]
        ];

        foreach ($roles as $roleData) {
            Role::firstOrCreate(
                ['name' => $roleData['name']],
                $roleData
            );
        }
    }
}
