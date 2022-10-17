<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function movies()
    {
        return $this->hasMany(Movie::class);
    }

    public function movies_export()
    {
        return $this->hasMany(Movie::class)
            ->select(['title', 'year', 'imdbID', 'poster', 'status_id', 'category_id']);
    }

    public static function findByNameAndUser($name, $user)
    {
        return Category::where('name', $name)
            ->where('user_id', $user->id)
            ->where('user_id', $user->id)
            ->first();
    }
}
