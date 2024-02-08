import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllContexts from '../context/AllContexts';

export default function Login() {
    const navigate = useNavigate();
    const { showAlert, setprogress } = useContext(AllContexts);

    const [login, setlogin] = useState({ email: "", password: "" });
    const [loginText, setloginText] = useState("Login");
    const resetButtonText = () => {
        setloginText("Login");
    };
    const validate = () => {
        let result = {
            'success': false
        };
        const { email, password } = login;

        if (email === '') {
            result['success'] = false;
            result['color'] = 'danger';
            result['message'] = 'Email not valid!';
            result['type'] = 'Error';
        }
        else if (password === '') {
            result['success'] = false;
            result['color'] = 'danger';
            result['message'] = 'Password Cannot Be Empty!';
            result['type'] = 'Error';
        }
        else if (password.length < 8) {
            result['success'] = false;
            result['color'] = 'danger';
            result['message'] = 'Password must be at least 8 characters long';
            result['type'] = 'Error';
        }
        else {
            result['success'] = true;
        }
        return result;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setprogress(20);
        setloginText("Validating....");
        const result = validate();
        if (!result.success) {
            resetButtonText();
            showAlert(result.color, result.message, result.type);
            return;
        }
        setprogress(40);
        const response = await fetch('http://127.0.0.1:8000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email: login.email, password: login.password })
        });
        const json = await response.json();
        console.log(json);
        setprogress(70);
        if (json.success) {
            resetButtonText();
            setlogin({ email: "", password: "" });
            localStorage.setItem('authToken', json.authToken);
            showAlert('success', json.successMessage, 'Success');
            navigate('/');
        }
        else {
            resetButtonText();
            showAlert('danger', json.errorMessage, 'Error');
        }
        setprogress(100);
    };

    const handleOnChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <h2 className='text-center my-2'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={login.email} onChange={handleOnChange} placeholder='Enter Your Email' required autoComplete='username' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={login.password} onChange={handleOnChange} placeholder='Enter Your Password' required minLength={8} autoComplete='current-password' />
                </div>
                <button type="submit" className="btn btn-primary">{loginText}</button>
            </form>
        </div>
    );
}
