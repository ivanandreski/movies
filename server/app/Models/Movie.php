<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function findByImdbIDAndUserAndCategory($imdbID, $user, $category)
    {
        return Movie::where('imdbID', $imdbID)
            ->where('user_id', $user->id)
            ->where('category_id', $category->id)
            ->first();
    }
}
