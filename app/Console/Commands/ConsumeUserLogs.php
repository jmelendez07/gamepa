<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Junges\Kafka\Facades\Kafka;
use Junges\Kafka\Contracts\ConsumerMessage;
use App\Models\UserLog;
use Illuminate\Support\Facades\Log;

class ConsumeUserLogs extends Command
{
    protected $signature = 'kafka:consume-logs {--once : Consume only one message}';
    protected $description = 'Consume user logs from Kafka and save to MongoDB';

    public function handle(): void
    {
        $this->info('Starting Kafka consumer for user logs...');

        $consumer = Kafka::consumer(['user-logs'])
            ->withConsumerGroupId(config('kafka.consumer_group_id'))
            ->withAutoCommit()
            ->withHandler(function (ConsumerMessage $message) {
                return $this->processMessage($message);
            })
            ->withDlq()
            ->build();

        if ($this->option('once')) {
            $consumer->consumeOnce();
        } else {
            $consumer->consume();
        }
    }

    private function processMessage(ConsumerMessage $message): bool
    {
        try {
            $body = $message->getBody();

            $this->info("Processing log for user: {$body['user_id']}");

            UserLog::create($body);

            $this->info("✓ Log saved successfully");

            return true;
        } catch (\Exception $e) {
            $this->error("Failed to process message: {$e->getMessage()}");
            Log::error('Kafka consumer error', [
                'message' => $e->getMessage(),
                'body' => $message->getBody(),
            ]);

            return false;
        }
    }
}