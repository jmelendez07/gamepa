<?php

namespace App\Models;

use Carbon\Carbon;
use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Session extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'sessions';

    protected $fillable = [
        'id',
        'user_id',
        'ip_address',
        'user_agent',
        'payload',
        'last_activity',
    ];

    public $timestamps = false;

    protected $casts = [
        'last_activity' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the last activity as a Carbon instance
     */
    public function getLastActivityAttribute($value)
    {
        return Carbon::createFromTimestamp($value);
    }

    /**
     * Check if the session is currently active (within last 5 minutes)
     */
    public function isActive(): bool
    {
        return $this->last_activity->diffInMinutes(now()) <= 5;
    }

    /**
     * Get a human-readable user agent
     */
    public function getBrowserAttribute(): string
    {
        $userAgent = $this->user_agent;
        
        if (str_contains($userAgent, 'Chrome')) {
            return 'Chrome';
        } elseif (str_contains($userAgent, 'Firefox')) {
            return 'Firefox';
        } elseif (str_contains($userAgent, 'Safari')) {
            return 'Safari';
        } elseif (str_contains($userAgent, 'Edge')) {
            return 'Edge';
        } else {
            return 'Desconocido';
        }
    }

    /**
     * Get the operating system from user agent
     */
    public function getOperatingSystemAttribute(): string
    {
        $userAgent = $this->user_agent;
        
        if (str_contains($userAgent, 'Windows')) {
            return 'Windows';
        } elseif (str_contains($userAgent, 'Mac OS')) {
            return 'macOS';
        } elseif (str_contains($userAgent, 'Linux')) {
            return 'Linux';
        } elseif (str_contains($userAgent, 'Android')) {
            return 'Android';
        } elseif (str_contains($userAgent, 'iOS')) {
            return 'iOS';
        } else {
            return 'Desconocido';
        }
    }

    public static function getSessionsLastMonth(): array
    {
        $startDate = Carbon::now()->subDays(30)->startOfDay();
        
        // Obtener todas las sesiones de los últimos 30 días
        // last_activity es un timestamp numérico
        $sessions = self::where('last_activity', '>=', $startDate->timestamp)->get();
        
        // Agrupar por fecha y contar
        $grouped = $sessions->groupBy(function ($session) {
            // last_activity ya viene como timestamp numérico
            return Carbon::createFromTimestamp($session->getRawOriginal('last_activity'))->format('Y-m-d');
        })->map(function ($group) {
            return $group->count();
        });
        
        // Crear array con todos los días (incluso los que tienen 0 sesiones)
        $sessionsData = [];
        for ($i = 29; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dateKey = $date->format('Y-m-d');
            $dateLabel = $date->format('d M');
            
            $sessionsData[] = [
                'date' => $dateLabel,
                'count' => $grouped[$dateKey] ?? 0
            ];
        }
        
        return $sessionsData;
    }
}
