<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index()
    {
        // Devolvemos posts paginados e incluimos el usuario
        $posts = Post::with('user')->orderBy('id', 'desc')->paginate(10);
        return response()->json($posts, 200);
    }

    public function show($id)
    {
        $post = Post::with('user')->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post no encontrado'], 404);
        }

        return response()->json($post, 200);
    }

    public function comments($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post no encontrado'], 404);
        }

        return response()->json($post->comments, 200);
    }

    public function store(Request $request)
    {
        // Validación básica requerida
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'user_id' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $post = Post::create($validator->validated());

        return response()->json($post, 201);
    }

    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post no encontrado'], 404);
        }

        $post->delete();

        return response()->json(['message' => 'Post eliminado correctamente'], 200);
    }
}