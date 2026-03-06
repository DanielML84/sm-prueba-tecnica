<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;

class ImportJsonPlaceholderData extends Command
{
    // El nombre del comando que usaremos en la terminal
    protected $signature = 'import:jsonplaceholder';

    // Descripción para la ayuda de artisan
    protected $description = 'Importa usuarios, posts y comentarios desde JSONPlaceholder sin duplicados';

    public function handle()
    {
        $this->info('Iniciando importación desde JSONPlaceholder...');

        // 1. Importar Usuarios
        $this->info('Importando usuarios...');
        $usersResponse = Http::get('https://jsonplaceholder.typicode.com/users');
        
        if ($usersResponse->successful()) {
            foreach ($usersResponse->json() as $user) {
                User::updateOrCreate(
                    ['id' => $user['id']], // Buscamos por ID para evitar duplicados
                    [
                        'name' => $user['name'],
                        'username' => $user['username'],
                        'email' => $user['email'],
                        'password' => bcrypt('password123') // Contraseña genérica necesaria
                    ]
                );
            }
        }

        // 2. Importar Posts
        $this->info('Importando posts...');
        $postsResponse = Http::get('https://jsonplaceholder.typicode.com/posts');
        
        if ($postsResponse->successful()) {
            foreach ($postsResponse->json() as $post) {
                Post::updateOrCreate(
                    ['id' => $post['id']],
                    [
                        'user_id' => $post['userId'],
                        'title' => $post['title'],
                        'body' => $post['body']
                    ]
                );
            }
        }

        // 3. Importar Comentarios
        $this->info('Importando comentarios...');
        $commentsResponse = Http::get('https://jsonplaceholder.typicode.com/comments');
        
        if ($commentsResponse->successful()) {
            foreach ($commentsResponse->json() as $comment) {
                Comment::updateOrCreate(
                    ['id' => $comment['id']],
                    [
                        'post_id' => $comment['postId'],
                        'name' => $comment['name'],
                        'email' => $comment['email'],
                        'body' => $comment['body']
                    ]
                );
            }
        }

        $this->info('¡Importación completada con éxito!');
    }
}