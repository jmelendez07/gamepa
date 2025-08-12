<?php

namespace App\Providers;

use App\Session\MongoSessionHandler;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Session;
use MongoDB\Client;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Registrar el driver de sesión personalizado para MongoDB
        Session::extend('mongodb', function ($app) {
            $connection = $app['db']->connection('mongodb');
            $client = $connection->getMongoClient();
            $database = $client->selectDatabase($connection->getDatabaseName());
            
            return new MongoSessionHandler(
                $database,
                'sessions',
                config('session.lifetime')
            );
        });
    }
}
