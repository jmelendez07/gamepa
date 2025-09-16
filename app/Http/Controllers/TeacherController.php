<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;
use MongoDB\Laravel\Eloquent\Model; // Para MongoDB
use Illuminate\Support\Facades\Log;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Role::where('name', 'docente')->firstOrFail()->users()->orderBy('updated_at', 'desc')->get();

        return Inertia::render('dashboard/teachers/index', [
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $teacher = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $teacher->assignRole('docente');

        return redirect()->back()->with('success', 'Docente ' . $teacher->name .  ' creado exitosamente.');
    }

    public function update(Request $request, $userId)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $userId,
        ];

        if ($request->has('password') && !empty($request->password)) {
            $rules['password'] = 'required|string|min:8|confirmed';
        }

        $validated = $request->validate($rules);

        $teacher = User::findOrFail($userId);
        $teacher->name = $validated['name'];
        $teacher->email = $validated['email'];

        if (isset($validated['password'])) {
            $teacher->password = Hash::make($validated['password']);
        }

        $teacher->save();

        return redirect()->back()->with('success', 'Docente ' . $teacher->name . ' actualizado exitosamente.');
    }

    public function destroy($userId)
    {
        $teacher = User::findOrFail($userId);
        $teacherName = $teacher->name;
        $teacher->delete();

        return redirect()->back()->with('success', 'Docente ' . $teacherName . ' eliminado exitosamente.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'teacher_ids' => 'required|array|min:1',
            'teacher_ids.*' => 'required|string' // MongoDB usa strings para ObjectId, no integers
        ]);

        try {
            $teacherIds = $request->teacher_ids;
            
            // Verificar que todos los IDs existen antes de eliminar
            $existingTeachers = User::whereIn('_id', $teacherIds)->get();
            
            if ($existingTeachers->count() !== count($teacherIds)) {
                return redirect()->back()
                    ->with('error', 'Algunos docentes no fueron encontrados.');
            }

            // Eliminar los docentes
            $deletedCount = User::whereIn('_id', $teacherIds)->delete();

            $message = $deletedCount === 1 
                ? 'Docente eliminado exitosamente.' 
                : "{$deletedCount} docentes eliminados exitosamente.";

            return redirect()->back()
                ->with('success', $message);

        } catch (\Exception $e) {
            Log::error('Error eliminando docentes: ' . $e->getMessage());
            
            return redirect()->back()
                ->with('error', 'Error al eliminar los docentes. Inténtalo de nuevo.');
        }
    }
}
