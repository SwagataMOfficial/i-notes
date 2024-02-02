<?php

use App\Http\Controllers\NotesController;
use App\Models\Account;
use App\Models\Note;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// index route
Route::get('/', function () {
    return 'Hello World';
});

// this is for db connection testing purpose
Route::get('/accounts/view', function () {
    $accounts = Account::all();
    echo '<pre>';
    print_r($accounts->toArray());
    echo '</pre>';
});
Route::get('/accounts/view/{email}', function ($email) {
    // $accounts = Account::where('email','=',$email)->orWhere()->get();
    $accounts = Account::where('email','=',$email)->get();
    echo '<pre>';
    print_r($accounts->toArray());
    // echo count($accounts);
    echo '</pre>';
});

Route::get('/accounts/delete/{id}', function ($id) {
    // $accounts = Account::where('email','=',$email)->orWhere()->get();
    $accounts = Account::find($id);
    echo '<pre>';
    print_r($accounts->toArray());
    echo '</pre>';
});

Route::get('/notes/view/{token}', function ($token) {
    $note = Note::where('authtoken','=', $token)->get()->toArray();
    $response = [];
    echo '<pre>';
    print_r($note);
    echo '</pre>';
    echo '<hr>';
    foreach ($note as $key => $value) {
        $response[$key] = $value;
    }
    echo '<pre>';
    echo json_encode($response);
    echo '</pre>';
    echo '<hr>';
});

Route::get('/notes/delete/{id}', function ($id) {
    $note = Note::find($id);
    // echo '<pre>';
    // print_r($note);
    echo count($note->toArray());
    // echo '</pre>';
    echo '<hr>';
});