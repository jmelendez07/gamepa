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
        $users = User::with(['roles', 'sessions' => function ($query) {
            $query->orderBy('last_activity', 'desc')->limit(1);
        }])->latest()->paginate(10);

        $users->getCollection()->transform(function ($user) {
            $lastSession = $user->sessions->first();
            
            $user->last_session = $lastSession ? [
                'browser' => $lastSession->browser,
                'operating_system' => $lastSession->operating_system,
                'last_activity' => $lastSession->last_activity,
                'is_active' => $lastSession->isActive(),
                'formatted_activity' => $this->formatLastActivity($lastSession->getOriginal('last_activity'))
            ] : null;
            
            unset($user->sessions);
            
            return $user;
        });

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Formatear la última actividad de manera legible
     */
    private function formatLastActivity($timestamp): string
    {
        try {
            // Si es un objeto Carbon, obtener el timestamp
            if ($timestamp instanceof \Carbon\Carbon) {
                $lastActivity = $timestamp->timestamp;
            } elseif (is_numeric($timestamp)) {
                $lastActivity = (int) $timestamp;
            } elseif (is_string($timestamp)) {
                $lastActivity = strtotime($timestamp);
            } else {
                return 'Fecha inválida';
            }
            
            // Verificar que el timestamp sea válido
            if ($lastActivity === false || $lastActivity <= 0) {
                return 'Fecha inválida';
            }
            
            $now = time();
            $diffInSeconds = $now - $lastActivity;
            
            // Si la diferencia es negativa (fecha futura), mostrar "Ahora mismo"
            if ($diffInSeconds < 0) {
                return 'Ahora mismo';
            }
            
            $diffInMinutes = floor($diffInSeconds / 60);
            
            if ($diffInMinutes < 1) {
                return 'Ahora mismo';
            } elseif ($diffInMinutes < 60) {
                return "Hace {$diffInMinutes} minuto" . ($diffInMinutes > 1 ? 's' : '');
            } elseif ($diffInMinutes < 1440) { // 24 horas
                $hours = floor($diffInMinutes / 60);
                return "Hace {$hours} hora" . ($hours > 1 ? 's' : '');
            } elseif ($diffInMinutes < 10080) { // 7 días
                $days = floor($diffInMinutes / 1440);
                return "Hace {$days} día" . ($days > 1 ? 's' : '');
            } else {
                // Para períodos más largos, usar formato de fecha
                return date('d/m/Y H:i', $lastActivity);
            }
        } catch (\Exception $e) {
            return 'Fecha inválida';
        }
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
        try {
            $user = User::findOrFail($id);
            $isCurrentUser = $user->id === Auth::id();
            
            $rules = [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            ];
            
            if ($request->has('password') && !empty($request->password)) {
                $rules['password'] = 'required|string|min:8|confirmed';
            }
            
            $validated = $request->validate($rules);
            
            $user->name = $validated['name'];
            $user->email = $validated['email'];
            
            if (isset($validated['password'])) {
                $user->password = bcrypt($validated['password']);
                
                if ($isCurrentUser) {
                    $currentSessionId = $request->session()->getId();
                    $user->sessions()->where('id', '!=', $currentSessionId)->delete();
                }
            }
            
            $user->save();
            
            $message = $isCurrentUser 
                ? 'Tu perfil ha sido actualizado correctamente.'
                : "El perfil de {$user->name} ha sido actualizado correctamente.";
            
            return back()->with('success', $message);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Ocurrió un error al actualizar el usuario: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $isCurrentUser = $user->id === Auth::id();
            
            $user->sessions()->delete();
            
            $user->roles()->detach();
            
            $userName = $user->name;
            $userEmail = $user->email;
            
            $user->delete();
            
            if ($isCurrentUser) {
                Auth::logout();
                request()->session()->invalidate();
                request()->session()->regenerateToken();
                
                return redirect()->route('home')->with('success', 
                    "Tu cuenta ({$userEmail}) ha sido eliminada permanentemente. Esperamos verte de nuevo pronto."
                );
            }
            
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
