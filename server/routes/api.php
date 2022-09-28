<?php

use App\Http\Controllers\CategoriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['prefix' => 'users'], function () {
    Route::get("/{user:name}/categories", [CategoriesController::class, 'getUserCategories']);
});

Route::group(['prefix' => 'categories'], function () {
    Route::get("create", [CategoriesController::class, 'create']);
    Route::get("/{category}/update", [CategoriesController::class, 'update']);
    Route::get("/{category}/delete", [CategoriesController::class, 'delete']);
});
