<?php

namespace App\Service;

use App\Models\Category;
use App\Models\User;
use App\Models\Movie;

class UserDataExportService
{
    public function buildExport(User $user, $fileType)
    {
        if ($fileType == 'csv') {
            return $this->buildUserDataCsv($user);
        }
        if ($fileType == 'json') {
            return $this->buildUserDataJson($user);
        }
    }

    private function buildUserDataCsv(User $user)
    {
        // we use a threshold of 1 MB (5MB * 1024), it's just an example
        $fd = fopen('php://temp/maxmemory:1048576', 'w');
        if ($fd === false) {
            die('Failed to open temporary file');
        }

        $categories = $user->categories;

        $callback = function () use ($categories) {
            $file = fopen('php://output', 'w');

            $header = ['title', 'year', 'imdbID', 'poster', 'status_id', 'category_name'];
            fputcsv($file, $header);

            foreach ($categories as $category) {
                $movies = Movie::where('category_id', $category->id)->get();
                foreach ($movies as $movie) {
                    $line = [$movie->title, $movie->year, $movie->imdbID, $movie->poster, $movie->status_id, $category->name];
                    fputcsv($file, $line);
                }
            }

            fclose($file);
        };

        $headers = array(
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=file.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        );

        return response()->stream($callback, 200, $headers);
    }

    private function buildUserDataJson(User $user)
    {
        // we use a threshold of 1 MB (5MB * 1024), it's just an example
        $fd = fopen('php://temp/maxmemory:1048576', 'w');
        if ($fd === false) {
            die('Failed to open temporary file');
        }

        $callback = function () use ($user) {
            $file = fopen('php://output', 'w');

            $categories = Category::select('name', 'id')
                ->with('movies_export')
                ->where('user_id', $user->id)
                ->get();
            fwrite($file, $categories->toJson(JSON_PRETTY_PRINT));

            fclose($file);
        };

        $headers = array(
            "Content-type" => "application/json",
            "Content-Disposition" => "attachment; filename=export.json",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        );

        return response()->stream($callback, 200, $headers);
    }
}
