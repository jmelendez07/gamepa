<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Level;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('estudiante');

        $levelOneId = Level::where('order', 1)->first()->id;

        Profile::create([
            'user_id' => $user->id,
            'level_id' => $levelOneId,
            'avatar_url' => asset('assets/default-user-avatar.png'),
            'progress_bar' => 0,
            'total_xp' => 0,
        ]);

        event(new Registered($user));

        Auth::login($user);

        if (Auth::user()->hasRole('administrador')) {
            return redirect()->intended(route('dashboard'));
        } else if (Auth::user()->hasRole('docente')) {
            return redirect()->intended(route('rooms.index'));
        }

        return redirect()->intended(route('heroes.options'));
    }
}
