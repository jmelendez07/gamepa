<?php

namespace App\Providers;

use App\Session\MongoSessionHandler;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Session;
use MongoDB\Client;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Route::resourceVerbs([
            'create' => 'crear',
            'edit' => 'editar',
        ]);

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
