<?php

namespace App\Traits;

use App\Services\KafkaLogProducerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

trait LogsUserActivity
{
    protected function logActivity(
        Request $request,
        string $action,
        $response = null,
        array $additionalMetadata = [],
        float $startTime = null
    ): void {
        $executionTime = $startTime ? round((microtime(true) - $startTime) * 1000, 2) : null;

        $logData = [
            'user_id' => Auth::id(),
            'action' => $action,
            'controller' => static::class,
            'method' => debug_backtrace()[1]['function'] ?? 'unknown',
            'route' => $request->route()?->getName() ?? $request->path(),
            'request_data' => $this->sanitizeRequestData($request->all()),
            'response_data' => $this->sanitizeResponseData($response),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'status_code' => $this->getStatusCode($response),
            'execution_time' => $executionTime,
            'metadata' => array_merge([
                'referer' => $request->header('referer'),
                'method' => $request->method(),
            ], $additionalMetadata),
            'logged_at' => now(),
        ];

        app(KafkaLogProducerService::class)->sendLog($logData);
    }

    private function sanitizeRequestData(array $data): array
    {
        $sensitiveKeys = ['password', 'password_confirmation', 'token', 'api_key', 'secret'];
        
        foreach ($sensitiveKeys as $key) {
            if (isset($data[$key])) {
                $data[$key] = '***REDACTED***';
            }
        }

        return $data;
    }

    private function sanitizeResponseData($response): ?array
    {
        if (!$response) {
            return null;
        }

        if (method_exists($response, 'getData')) {
            return (array) $response->getData();
        }

        if (is_array($response)) {
            return $response;
        }

        return null;
    }

    private function getStatusCode($response): ?int
    {
        if (method_exists($response, 'status')) {
            return $response->status();
        }

        if (method_exists($response, 'getStatusCode')) {
            return $response->getStatusCode();
        }

        return 200;
    }
}