<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Crear permisos primero
        $permissions = [
            ['name' => 'create_users', 'guard_name' => 'web'],
            ['name' => 'edit_users', 'guard_name' => 'web'],
            ['name' => 'delete_users', 'guard_name' => 'web'],
            ['name' => 'view_users', 'guard_name' => 'web'],
        ];

        foreach ($permissions as $permissionData) {
            Permission::firstOrCreate(
                ['name' => $permissionData['name']],
                $permissionData
            );
        }

        // Crear roles
        $roles = [
            [
                'name' => 'administrador',
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

        // Asignar permisos a roles
        $adminRole = Role::where('name', 'administrador')->first();
        if ($adminRole) {
            $adminRole->permissions()->sync(Permission::all());
        }
    }
}
