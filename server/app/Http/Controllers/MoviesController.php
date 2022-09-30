<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use RarBG;
use TorrentAPI\TorrentAPI;

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

        $response =  Http::get($url);
        return response()->success("", [
            'movies' => $response['Search']
        ]);

        $movies = [];
        for ($i = 1; $i < 4; $i++) {
            $url .= "&page=$i";
            $response = Http::get($url);
            if ($response->json()['Search'] != null) {
                $movies = array_merge($movies, $response->Search);
            }
        }

        return response()->success("", [
            'movies' => $movies
        ]);
    }

    public function create(Request $request)
    {
        try {
            $validate = Validator::make(
                $request->all(),
                [
                    'title' => 'required',
                    'year' => 'required|integer',
                    'categoryId' => 'required|exists:categories,id',
                    'poster' => 'required',
                    'imdbID' => 'required'
                ]
            );

            if ($validate->fails()) {
                return response()->validationError($validate->errors());
            }

            $user = User::find(auth()->user()->id);
            $movie = new Movie();
            $movie->title = $request->title;
            $movie->year = $request->year;
            $movie->category_id = $request->categoryId;
            $movie->poster = $request->poster;
            $movie->imdbID = $request->imdbID;
            $movie->status_id = 1;
            $movie->user_id = $user->id;
            $movie->save();

            return response()->success("Movie $movie->title added to category successfully!", [
                'movie' => $movie,
            ]);
        } catch (\Throwable $th) {
            return response()->error($th->getMessage(), 500);
        }
    }

    public function getTorrents(Movie $movie)
    {
    }

    public function delete(Movie $movie)
    {
    }

    public function changeStatus(Movie $movie, Request $request)
    {
        $user = User::find(auth()->user()->id);
        $movies = Movie::where('user_id', $user->id)
            ->where('title', $movie->title)
            ->where('year', $movie->year)
            ->get();
        foreach ($movies as $movie) {
            $movie->status_id = $request->statusId;
            $movie->save();
        }

        return response()->success("Movie $movie->movie status changed successfully!", [
            'movie' => $user->movies,
        ]);
    }
}
