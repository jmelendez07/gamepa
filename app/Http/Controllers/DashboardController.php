<?php

namespace App\Http\Controllers;

use App\Models\Session;
use App\Models\Dificulty;
use App\Models\Planet;
use App\Models\Profile;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $users = User::count();
        $sessions = Session::count();
        $difficulties = Dificulty::with(['exercises'])->get();
        $averageProgress = Profile::getAverageProgress();
        $sessionsLastMonth = Session::getSessionsLastMonth();
        $profilesPerPlanet = Planet::with('profiles')->get()->map(function ($planet) {
            return [
                'id' => $planet->id,
                'name' => $planet->name,
                'profiles_count' => $planet->profiles->count()
            ];
        });
 
        return Inertia::render('dashboard', [
            'users' => $users,
            'sessions' => $sessions,
            'difficulties' => $difficulties,
            'averageProgress' => $averageProgress,
            'sessionsLastMonth' => $sessionsLastMonth,
            'profilesPerPlanet' => $profilesPerPlanet,
        ]);
    }
}