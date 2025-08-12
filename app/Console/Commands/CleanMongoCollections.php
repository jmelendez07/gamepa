<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use MongoDB\Client;

class CleanMongoCollections extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mongo:clean {--collections=* : Collections to clean}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean MongoDB collections to fix duplicate key errors';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $connection = config('database.connections.mongodb');
        $client = new Client($connection['dsn']);
        $database = $client->selectDatabase($connection['database']);
        
        $collections = $this->option('collections') ?: ['sessions', 'cache'];
        
        foreach ($collections as $collectionName) {
            $this->info("Cleaning collection: {$collectionName}");
            
            try {
                $collection = $database->selectCollection($collectionName);
                $collection->drop();
                $this->info("✓ Collection {$collectionName} cleaned successfully");
            } catch (\Exception $e) {
                $this->error("✗ Failed to clean {$collectionName}: " . $e->getMessage());
            }
        }
        
        $this->info('MongoDB collections cleaned!');
        return 0;
    }
}
