<?php

namespace App\Service;

use App\Models\Category;
use App\Models\User;
use App\Models\Movie;

class UserDataImportService
{
    public function buildImport(User $user, $file)
    {
        $fileType = $file->getClientOriginalExtension();
        if ($fileType == 'csv') {
            return $this->buildUserDataCsv($user, $file);
        }
        if ($fileType == 'json') {
            return $this->buildUserDataJson($user, $file);
        }
    }

    private function buildUserDataCsv(User $user, $file)
    {
        $counter = 0;
        $skipDuplicate = 0;

        $path = $file->getRealPath();

        $records = array_map('str_getcsv', file($path));
        array_shift($records);

        // title,year,imdbID,poster,status_id,category_name
        foreach ($records as $record) {
            $category = Category::findByNameAndUser($record[5], $user);
            if ($category == null) {
                $category = new Category();
                $category->name = $record[5];
                $category->user_id = $user->id;
                $category->save();
            }

            $movie = Movie::findByImdbIDAndUserAndCategory($record[2], $user, $category);
            if ($movie == null) {
                $movie = new Movie();
                $movie->title = $record[0];
                $movie->year = $record[1];
                $movie->imdbID = $record[2];
                $movie->poster = $record[3];
                $movie->status_id = $record[4];
                $movie->category_id = $category->id;
                $movie->user_id = $user->id;
                $movie->save();

                $counter++;
            } else {
                $skipDuplicate++;
            }
        }

        return [
            'success' => "$counter movies added successfully",
            'duplicate' => "$skipDuplicate movies skipped",
        ];
    }

    private function buildUserDataJson(User $user, $file)
    {
        $counter = 0;
        $skipDuplicate = 0;

        $path = $file->getRealPath();

        $records = json_decode(file_get_contents($path), true);

        foreach ($records as $key => $value) {
            $category = Category::findByNameAndUser($value['name'], $user);
            if ($category == null) {
                $category = new Category();
                $category->name = $value['name'];
                $category->user_id = $user->id;
                $category->save();
            }

            foreach ($value['movies_export'] as $key => $value) {
                $movie = Movie::findByImdbIDAndUserAndCategory($value['imdbID'], $user, $category);
                if ($movie == null) {
                    $movie = new Movie();
                    $movie->title = $value['title'];
                    $movie->year = $value['year'];
                    $movie->imdbID = $value['imdbID'];
                    $movie->poster = $value['poster'];
                    $movie->status_id = $value['status_id'];
                    $movie->category_id = $category->id;
                    $movie->user_id = $user->id;
                    $movie->save();

                    $counter++;
                } else {
                    $skipDuplicate++;
                }
            }
        }

        return [
            'success' => "$counter movies added successfully",
            'duplicate' => "$skipDuplicate movies skipped",
        ];
    }
}
