<?php

namespace App\Session;

use Illuminate\Contracts\Session\Session;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\Auth;
use MongoDB\Collection;
use MongoDB\Database;

class MongoSessionHandler implements \SessionHandlerInterface
{
    protected Database $database;
    protected Collection $collection;
    protected int $lifetime;

    public function __construct(Database $database, string $collection = 'sessions', int $lifetime = 1440)
    {
        $this->database = $database;
        $this->collection = $this->database->selectCollection($collection);
        $this->lifetime = $lifetime;
    }

    public function open(string $path, string $name): bool
    {
        return true;
    }

    public function close(): bool
    {
        return true;
    }

    public function read(string $id): string
    {
        $session = $this->collection->findOne(['_id' => $id]);
        
        if ($session && isset($session['payload'])) {
            // Verificar si la sesión no ha expirado
            if (isset($session['last_activity']) && 
                $session['last_activity'] < (time() - $this->lifetime * 60)) {
                $this->destroy($id);
                return '';
            }
            
            return $session['payload'];
        }

        return '';
    }

    public function write(string $id, string $data): bool
    {
        try {
            $this->collection->replaceOne(
                ['_id' => $id],
                [
                    '_id' => $id,
                    'payload' => $data,
                    'last_activity' => time(),
                    'user_id' => Auth::check() ? Auth::user()->getAuthIdentifier() : null,
                    'ip_address' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                ],
                ['upsert' => true]
            );
            
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function destroy(string $id): bool
    {
        try {
            $this->collection->deleteOne(['_id' => $id]);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function gc(int $max_lifetime): int|false
    {
        try {
            $expiredTime = time() - $max_lifetime;
            $result = $this->collection->deleteMany([
                'last_activity' => ['$lt' => $expiredTime]
            ]);
            
            return $result->getDeletedCount();
        } catch (\Exception $e) {
            return false;
        }
    }
}
