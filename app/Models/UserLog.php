<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class UserLog extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'user_logs';

    protected $fillable = [
        'user_id',
        'action',
        'controller',
        'method',
        'route',
        'request_data',
        'response_data',
        'ip_address',
        'user_agent',
        'status_code',
        'execution_time',
        'metadata',
        'logged_at',
    ];

    protected $casts = [
        'request_data' => 'array',
        'response_data' => 'array',
        'metadata' => 'array',
        'logged_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id', 'id');
    }
}
