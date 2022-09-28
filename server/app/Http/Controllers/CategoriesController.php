<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function getUserCategories(User $user)
    {
        $userAsker = User::find(auth()->user()->id);
        if ($user->id == $userAsker->id || $user->visibility) {
            return response()->json([
                $user->categories()
            ]);
        }

        // No permission response
    }

    public function create(Request $request)
    {
        // validate if name exists 

        $user = User::find(auth()->user()->id);
        $category = new Category();
        $category->name = $request->name;
        $category->user_id = $user->id;
        $category->save();

        return response()->json([
            $user->categories()
        ]);
    }

    public function update(Category $category, Request $request)
    {
        $user = User::find(auth()->user()->id);
        $category->name = $request->name;
        $category->save();

        return response()->json([
            $user->categories()
        ]);
    }

    public function delete(Category $category, Request $request)
    {
        $user = User::find(auth()->user()->id);
        $category->delete();

        return response()->json([
            $user->categories()
        ]);
    }
}
