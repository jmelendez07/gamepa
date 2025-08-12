<?php

use Illuminate\Database\Migrations\Migration;
use MongoDB\Client;

return new class extends Migration
{
    public function up(): void
    {
        $connection = config('database.connections.mongodb');
        $client = new Client($connection['dsn']);
        $database = $client->selectDatabase($connection['database']);
        $collection = $database->selectCollection('sessions');
        
        try {
            // Eliminar índice existente si existe
            try {
                $collection->dropIndex('last_activity_1');
            } catch (\Exception $e) {
                // Ignorar si el índice no existe
            }
            
            // Crear índice TTL para limpiar sesiones expiradas automáticamente
            $collection->createIndex(
                ['last_activity' => 1],
                [
                    'expireAfterSeconds' => config('session.lifetime') * 60,
                    'name' => 'session_ttl_index'
                ]
            );
        } catch (\Exception $e) {
            // Ignorar errores de índices duplicados
        }
        
        // Crear índice único para _id si no existe (debería existir por defecto)
        try {
            $collection->createIndex(['_id' => 1], ['unique' => true]);
        } catch (\Exception $e) {
            // Ignorar si ya existe
        }
    }

    public function down(): void
    {
        $connection = config('database.connections.mongodb');
        $client = new Client($connection['dsn']);
        $database = $client->selectDatabase($connection['database']);
        $collection = $database->selectCollection('sessions');
        
        $collection->dropIndex('session_ttl_index');
    }
};
