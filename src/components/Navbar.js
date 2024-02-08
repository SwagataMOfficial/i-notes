import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import AllContexts from '../context/AllContexts';


export default function Navbar(props) {
    const navigate = useNavigate();
    const { setprogress, progress } = useContext(AllContexts);

    const handleLogout = () => {
        if (localStorage.getItem('authToken')) {
            props.setloggedin(false);
            localStorage.removeItem('authToken');
            navigate("/login");
        }
    };
    return (
        <>
            <LoadingBar color="#00ff45" progress={progress} onLoaderFinished={() => setprogress(0)} />

            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">{props.title}</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link">About</NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* rendering login signup button if not loggedin otherwise logout button */}
                    {!props.loggedin ? <div>
                        <NavLink to='/login' className="btn btn-primary mx-1">Login</NavLink>
                        <NavLink to='/signup' className="btn btn-primary mx-1">Sign-Up</NavLink>
                    </div> : <button type="button" className="btn btn-danger mx-1" onClick={handleLogout}>Logout</button>}
                </div>
            </nav>
        </>
    );
}
