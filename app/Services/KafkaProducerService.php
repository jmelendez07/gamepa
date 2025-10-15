<?php

namespace App\Services;

use Junges\Kafka\Facades\Kafka;
use Junges\Kafka\Message\Message;
use Illuminate\Support\Facades\Log;
use App\Models\UserLog;

class KafkaProducerService
{
    private const TOPIC = 'user-logs';

    public function sendLog(array $logData): void
    {
        try {
            $message = new Message(
                headers: [
                    'service' => config('app.name'),
                    'environment' => config('app.env'),
                ],
                body: $logData,
                key: (string) ($logData['user_id'] ?? 'guest')
            );

            Kafka::publish(self::TOPIC)
                ->withMessage($message)
                ->send();

            Log::debug('Log sent to Kafka', ['user_id' => $logData['user_id'] ?? null]);
        } catch (\Exception $e) {
            Log::error('Kafka error, saving directly to MongoDB: ' . $e->getMessage());
            $this->saveFallback($logData);
        }
    }

    private function saveFallback(array $logData): void
    {
        try {
            UserLog::create($logData);
        } catch (\Exception $e) {
            Log::critical('Failed to save log even as fallback: ' . $e->getMessage());
        }
    }
}