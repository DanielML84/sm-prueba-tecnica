<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Importar Usuarios desde JSONPlaceholder
        $usersResponse = Http::get('https://jsonplaceholder.typicode.com/users');
        
        if ($usersResponse->successful()) {
            $users = $usersResponse->json();
            
            foreach ($users as $userData) {
                // updateOrCreate busca por el primer array (id). Si existe, lo actualiza. Si no, lo crea.
                // Así evitamos los duplicados en múltiples ejecuciones.
                User::updateOrCreate(
                    ['id' => $userData['id']], 
                    [
                        'name' => $userData['name'],
                        'username' => $userData['username'],
                        'email' => $userData['email'],
                        // JSONPlaceholder no da contraseñas, le asignamos una por defecto
                        'password' => bcrypt('password'), 
                    ]
                );
            }
            $this->command->info('Usuarios importados correctamente desde JSONPlaceholder.');
        }

        // 2. Importar Posts desde JSONPlaceholder
        $postsResponse = Http::get('https://jsonplaceholder.typicode.com/posts');
        
        if ($postsResponse->successful()) {
            $posts = $postsResponse->json();
            
            foreach ($posts as $postData) {
                Post::updateOrCreate(
                    ['id' => $postData['id']],
                    [
                        'user_id' => $postData['userId'],
                        'title' => $postData['title'],
                        'body' => $postData['body'],
                    ]
                );
            }
            $this->command->info('Posts importados correctamente desde JSONPlaceholder.');
        }
    }
}