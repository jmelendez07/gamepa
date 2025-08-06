<?php

namespace App\Models;

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
        return \Carbon\Carbon::createFromTimestamp($value);
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
}
