<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;

class LoginController extends Controller {
    public function validateLogin(Request $request) {
        $result = ["success" => false];
        if(!is_null($request->email)){
            $user_account = Account::where('email', '=', $request->email)->get()->toArray();
            if (count($user_account) != 0) {
                if ($user_account[0]['password'] === $request->password) {
                    $result['success'] = true;
                    $result['authToken'] = $user_account[0]['authtoken'];
                    $result['successMessage'] = "You Are Successfully Loggedin";
                }
                else {
                    $result['success'] = false;
                    $result['errorMessage'] = "Passwords Do Not Matched";
                }
            }
            else {
                $result['success'] = false;
                $result['errorMessage'] = "Email Not Registered!";
            }
        }
        else{
            $result['success'] = false;
            $result['errorMessage'] = "Email Cannot Be Empty!";
        }
        return $result;
    }
}
