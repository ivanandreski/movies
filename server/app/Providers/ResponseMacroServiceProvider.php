<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class ResponseMacroServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Response::macro('success', function ($message = '', $data = []) {
            return Response::json([
                'status'  => true,
                'data' => $data,
            ]);
        });

        Response::macro('error', function ($message = '', $status = 400, $errors = []) {
            return Response::json([
                'status'  => false,
                'message' => $message,
                'errors' => $errors
            ], $status);
        });

        Response::macro('validationError', function ($errors = []) {
            return Response::json([
                'errors'  => true,
                'message' => 'Validation error',
                'errors' => $errors
            ], 401);
        });
    }
}
