<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\CategoryStoreRequest;
use App\Models\Movie;

class CategoriesController extends Controller
{
    public function getUserCategories(User $user)
    {
        try {
            $categories = Category::where('user_id', $user->id)->get();
            return response()->success("", [
                'categories' => $categories
            ]);
        } catch (\Throwable $th) {
            return response()->error($th->getMessage(), 500);
        }
    }

    public function getMoviesForCategory(Category $category)
    {
        try {
            $movies = Movie::where('category_id', $category->id)->get();
            foreach ($movies as $movie) {
                $movie->load(['status']);
            }
            return response()->success("", [
                'movies' => $movies
            ]);
        } catch (\Throwable $th) {
            return response()->error($th->getMessage(), 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $validate = Validator::make(
                $request->all(),
                [
                    'name' => 'required'
                ]
            );

            if ($validate->fails()) {
                return response()->validationError($validate->errors());
            }

            $user = User::find(auth()->user()->id);
            $category = new Category();
            $category->name = $request->name;
            $category->user_id = $user->id;
            $category->save();

            return response()->success("Category $category->name created successfully!", [
                'category' => $category,
            ]);
        } catch (\Throwable $th) {
            return response()->error($th->getMessage(), 500);
        }
    }

    public function update(Category $category, Request $request)
    {
        try {
            $validate = Validator::make(
                $request->all(),
                [
                    'name' => 'required'
                ]
            );

            if ($validate->fails()) {
                return response()->validationError($validate->errors());
            }

            $user = User::find(auth()->user()->id);
            $category->name = $request->name;
            $category->save();

            return response()->success("Category $category->name updated successfully!", [
                'category' => $category,
            ]);
        } catch (\Throwable $th) {
            return response()->error($th->getMessage(), 500);
        }
    }

    public function delete(Category $category)
    {
        try {
            $category->delete();

            return response()->success("Category $category->name deleted successfully!", [
                'category' => $category,
            ]);
        } catch (\Throwable $th) {
            return response()->error($th->getMessage(), 500);
        }
    }
}
