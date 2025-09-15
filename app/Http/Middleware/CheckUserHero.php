<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserHero
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && Auth::user()->hasRole('estudiante') && !Auth::user()->heroes()->exists()) {
            return redirect()->route('heroes.options');
        }

        return $next($request);
    }
}
