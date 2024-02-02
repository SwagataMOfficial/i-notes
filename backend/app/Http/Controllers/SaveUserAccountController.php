<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;

class SaveUserAccountController extends Controller {
    public function register_user(Request $request) {
        $result = ["success" => false];
        $user = new Account;
        // $request->validate([
        //     'email'=>'required|email',
        //     'password'=>'required',
        //     'cpassword'=>'required'
        // ]);
        // if(isset($errors->all())){

        // }
        if (!is_null($request->email)) {
            if ($request->password == $request->cpassword) {
                // every authentication is correct so saving data to db
                $user->email = $request->email;
                $user->password = $request->password;
                $user->authtoken = md5($request->email);
                $user->save();
                $result['success'] = true;
                $result['authToken'] = $user->authtoken;
                $result['successMessage'] = "Account Created Successfully";
            }
            else {
                $result['success'] = false;
                $result['errorMessage'] = "Passwords Do Not Mathed!";
            }
        }
        else {
                $result['success'] = false;
            $result['errorMessage'] = "Email Cannot be Empty!";
        }
        return $result;
    }
}
