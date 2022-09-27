<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function getAllForUser($username) {
        $user = User::where('name', '=', auth()->user()->name)->first();
        if($user == null || $user->visibility == -1)
        return response()->json([
            'error' => 'Unauthorized!'
        ], 401);

        $categories = Category::where('user_id', '=', $user->id)
            ->get();

        return response()->json([
            'data' => $categories,
        ], 200);
    }

    public function add(Request $request) {

    }

    public function update(Request $request) {
        
    }

    public function delete(Request $request) {
        
    }
}
