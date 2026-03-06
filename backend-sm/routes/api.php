<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Artisan;

// GET /api/posts
Route::get('/posts', [PostController::class, 'index']);

// GET /api/posts/{id}
Route::get('/posts/{id}', [PostController::class, 'show']);

// GET /api/posts/{id}/comments
Route::get('/posts/{id}/comments', [PostController::class, 'comments']);

// POST /api/posts
Route::post('/posts', [PostController::class, 'store']);

// DELETE /api/posts/{id}
Route::delete('/posts/{id}', [PostController::class, 'destroy']);

Route::get('/users', function() { return App\Models\User::all(); });

Route::get('/seed-database', function () {
    Artisan::call('db:seed', ['--force' => true]);
    return "Base de datos llenada con éxito";
});