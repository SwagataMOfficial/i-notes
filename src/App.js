import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './components/Home';
import About from './components/About';
import Error from './components/Error';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteContext from './context/NoteContext';

function App() {
	const [loggedin, setloggedin] = useState(false);

	return (
		<NoteContext>
			<Router>
				<Navbar title="iNotes" loggedin={loggedin} setloggedin={setloggedin} />
				<Alert />
				<Routes>
					<Route exact path='/' element={<Home setloggedin={setloggedin} />} />
					<Route exact path='/about' element={<About />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/signup' element={<Signup />} />
					<Route exact path='/*' element={<Error />} />
				</Routes>
			</Router>
		</NoteContext>
	);
}

export default App;
