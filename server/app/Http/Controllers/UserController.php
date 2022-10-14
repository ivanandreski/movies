<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Movie;
use App\Models\Category;
use App\Service\CsvBuilder;
use Illuminate\Http\Request;
use App\Service\UserDataExportService;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\CategoryStoreRequest;

class UserController extends Controller
{
    private UserDataExportService $userDataExportService;

    public function __construct(UserDataExportService $userDataExportService)
    {
        $this->userDataExportService = $userDataExportService;
    }

    public function export(User $user, Request $request)
    {
        $asker = User::find(auth()->user()->id);
        if ($asker->id != $user->id)
            return response()->error("You do not have permission to export another users data", 401);

        $fileType = $request->fileType;
        if ($fileType == null)
            return response()->error("File type not provided", 500);

        try {
            $file = $this->userDataExportService->buildExport($user, $fileType);
            return $file;
        } catch (\Throwable $th) {
            return response()->error($th->getMessage(), 500);
        }
    }
}
