import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const navigate = useNavigate();

    const [signup, setsignup] = useState({ email: "", password: "", cpassword: "" });
    const [buttonText, setbuttonText] = useState("Sign Up");
    const resetButtonText = () => {
        setbuttonText("Sign Up");
    }
    const validate = () => {
        let result = {
            'status': false
        };
        const { email, password, cpassword } = signup;

        if (email === '') {
            result['status'] = false;
            result['color'] = 'danger';
            result['message'] = 'Email not valid!';
            result['type'] = 'Error';
        }
        else if (password === '' || cpassword === '') {
            result['status'] = false;
            result['color'] = 'danger';
            result['message'] = 'Passwords Cannot Be Empty!';
            result['type'] = 'Error';
        }
        else if (password.length < 8 || cpassword.length < 8) {
            result['status'] = false;
            result['color'] = 'danger';
            result['message'] = 'Passwords must be at least 8 characters long';
            result['type'] = 'Error';
        }
        else {
            result['status'] = true;
        }
        return result;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        props.setprogress(20);
        setbuttonText("Validating...");
        const result = validate();
        props.setprogress(40);
        if (!result.status) {
            resetButtonText();
            props.showAlert(result.color, result.message, result.type);
            return;
        }
        setbuttonText("Signing Up...");
        props.setprogress(70);
        const response = await fetch('http://127.0.0.1:8000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email: signup.email, password: signup.password, cpassword: signup.cpassword })
        });
        const json = await response.json();
        props.setprogress(90);
        console.log(json);
        if (json.success) {
            localStorage.setItem('authToken', json.authToken);
            resetButtonText();
            setsignup({ email: "", password: "", cpassword: "" });
            props.showAlert('success', json.successMessage, 'Success');
            navigate('/');
        }
        else {
            resetButtonText();
            props.showAlert('danger', json.errorMessage, 'Error');
        }
        props.setprogress(100);
    };

    const handleOnChange = (e) => {
        setsignup({ ...signup, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <h2 className='text-center my-2'>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" required placeholder='Enter Your Email' onChange={handleOnChange} value={signup.email} autoComplete='username' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder='Enter Your Password' required onChange={handleOnChange} value={signup.password} minLength={8} autoComplete='new-password' />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' placeholder='Re-enter Your Password' required onChange={handleOnChange} value={signup.cpassword} minLength={8} autoComplete='new-password' />
                </div>
                <button type="submit" className="btn btn-primary">{buttonText}</button>
            </form>
        </div>
    );
}
