<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['authenticated'])->group(function () {
    Route::group(['prefix' => 'users'], function () {
        Route::get("/{user:name}/categories", [CategoriesController::class, 'getUserCategories']);
        Route::get("/{user:name}/export", [UserController::class, 'export']);
    });

    Route::group(['prefix' => 'categories'], function () {
        Route::post("create", [CategoriesController::class, 'create']);
        Route::get("/{category}/movies", [CategoriesController::class, 'getMoviesForCategory']);
        Route::put("/{category}/update", [CategoriesController::class, 'update']);
        Route::delete("/{category}/delete", [CategoriesController::class, 'delete']);
    });

    Route::group(['prefix' => 'movies'], function () {
        Route::get("search", [MoviesController::class, 'search']);
        Route::post("create", [MoviesController::class, 'create']);
        Route::get("/{movie}/torrents", [MoviesController::class, 'getTorrents']);
        Route::delete("/{movie}/delete", [MoviesController::class, 'delete']);
        Route::put("/{movie}/change-status", [MoviesController::class, 'changeStatus']);
    });
});
