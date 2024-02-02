import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './components/Home';
import About from './components/About';
import Error from './components/Error';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	const [alert, setalert] = useState(null);
	const [loggedin, setloggedin] = useState(false);
	const [progress, setprogress] = useState(0);

	const showAlert = (color, message, type) => {
		setalert(
			{
				alertColor: color,
				alertMessage: message,
				alertType: type
			}
		);
		setTimeout(() => {
			setalert(null);
		}, 2100);
	};

	return (
		<Router>
			<Navbar title="iNotes" loggedin={loggedin} setloggedin={setloggedin} />
			<LoadingBar color="#00ff45" progress={progress} onLoaderFinished={() => setprogress(0)} />
			<Alert alert={alert} showAlert={showAlert} />
			<Routes>
				<Route exact path='/' element={<Home setloggedin={setloggedin} showAlert={showAlert} setprogress={setprogress} />} />
				<Route exact path='/about' element={<About />} />
				<Route exact path='/login' element={<Login showAlert={showAlert} setprogress={setprogress} />} />
				<Route exact path='/signup' element={<Signup showAlert={showAlert} setprogress={setprogress} />} />
				<Route exact path='/*' element={<Error />} />
			</Routes>
		</Router>
	);
}

export default App;
