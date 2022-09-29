<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class MoviesController extends Controller
{
    public static string $omdbApiKey = "16dd980a";
    public static string $omdbUrl = "http://www.omdbapi.com/?apikey=";

    public function search(Request $request)
    {
        $year = null;
        $search = '';
        if ($request->has('search')) {
            $search = $request->query('search');
        }
        if ($request->has('year')) {
            $year = $request->query('year');
        }

        $url = static::$omdbUrl . static::$omdbApiKey . "&s=" . $search . "&type=movie";
        if ($year != null) {
            $url .= "&y=" . $year;
        }

        $response = Http::get($url);

        return $response->json();
    }

    public function create(Request $request)
    {
        
    }

    public function delete(Movie $movie)
    {
    }

    public function changeStatus(Movie $movie, Request $request)
    {
    }
}
