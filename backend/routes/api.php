<?php

// all controllers
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaveUserAccountController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NotesController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// group for user routes
Route::group(['prefix' => '/user'], function () {

    // api route for registration
    Route::post('/signup', [SaveUserAccountController::class, 'register_user']);

    // api route for login
    Route::post('/login', [LoginController::class, 'validateLogin']);
});

// group for note routes
Route::group(['prefix' => '/notes'], function () {

    // api route for creating note
    Route::post('/create', [NotesController::class, 'addNote']);

    // api route for fetching note
    Route::post('/get', [NotesController::class, 'getNote']);

    // api route for deleting note
    Route::post('/delete', [NotesController::class, 'deleteNote']);
    Route::post('/get', [NotesController::class, 'getNote']);

    // api route for updating note
    Route::post('/update', [NotesController::class, 'updateNote']);
});