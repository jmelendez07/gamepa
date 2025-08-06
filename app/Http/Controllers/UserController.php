<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with('roles')->latest()->paginate(10);

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        $user = User::with(['roles', 'sessions' => function ($query) {
            $query->orderBy('last_activity', 'desc')->limit(5);
        }])->findOrFail($id);
        
        $recentSessions = $user->sessions()
            ->where('last_activity', '>=', now()->subDays(30)->timestamp)
            ->orderBy('last_activity', 'desc')
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'browser' => $session->browser,
                    'operating_system' => $session->operating_system,
                    'last_activity' => $session->last_activity,
                    'is_active' => $session->isActive(),
                ];
            });
        
        return Inertia::render('users/show', [
            'user' => $user,
            'sessions' => $recentSessions,
            'isCurrentUser' => $user->id === Auth::id()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $isCurrentUser = $user->id === Auth::id();
            
            // Eliminar todas las sesiones del usuario
            $user->sessions()->delete();
            
            // Eliminar los roles del usuario
            $user->roles()->detach();
            
            // Almacenar información para el mensaje de éxito
            $userName = $user->name;
            $userEmail = $user->email;
            
            // Eliminar el usuario
            $user->delete();
            
            // Si el usuario eliminó su propia cuenta, cerrar sesión y redirigir al inicio
            if ($isCurrentUser) {
                Auth::logout();
                request()->session()->invalidate();
                request()->session()->regenerateToken();
                
                return redirect()->route('home')->with('success', 
                    "Tu cuenta ({$userEmail}) ha sido eliminada permanentemente. Esperamos verte de nuevo pronto."
                );
            }
            
            // Si un administrador eliminó a otro usuario
            return redirect()->route('users.index')->with('success', 
                "La cuenta de {$userName} ({$userEmail}) ha sido eliminada permanentemente."
            );
            
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Ocurrió un error al eliminar la cuenta: ' . $e->getMessage()
            ]);
        }
    }
}
