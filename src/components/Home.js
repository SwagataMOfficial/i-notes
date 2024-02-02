import React, { useEffect, useState } from 'react';
import NoteInput from './NoteInput';
import Spinner from './Spinner';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

export default function Home(props) {
	const navigate = useNavigate();
	const [notes, setnotes] = useState([]);
	const [display, setdisplay] = useState('none');
	const [loading, setloading] = useState(false);

	const getNotes = async () => {
		setloading(true);
		setdisplay("flex");
		props.setprogress(40);
		const response = await fetch('http://127.0.0.1:8000/api/notes/get', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ authtoken: localStorage.getItem('authToken') })
		});
		props.setprogress(75);
		const json = await response.json();
		// console.log(json);
		setnotes(json);
		props.setprogress(100);
		setdisplay('none');
		setloading(false);
	};

	const checkUserValidity = () => {
		if (localStorage.getItem('authToken')) {
			props.setloggedin(true);
			navigate('/');
		}
		else {
			props.setloggedin(false);
			navigate('/login');
		}
	};

	useEffect(() => {
		checkUserValidity();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (localStorage.getItem('authToken')) {
			getNotes();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container'>
			<NoteInput getNotes={getNotes} setprogress={props.setprogress} showAlert={props.showAlert} />
			<h3 className='text-center mb-3'>Your Notes</h3>
			<Spinner display={display} />
			<Notes notes={notes} loading={loading} showAlert={props.showAlert} setprogress={props.setprogress} getNotes={getNotes} />
		</div>
	);
}
