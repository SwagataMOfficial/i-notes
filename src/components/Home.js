import React, { useContext, useEffect, useState } from 'react';
import NoteInput from './NoteInput';
import Spinner from './Spinner';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';
import AllContexts from '../context/AllContexts';

export default function Home(props) {
	const navigate = useNavigate();
	const { getNotes } = useContext(AllContexts);

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
			<NoteInput />
			<h3 className='text-center mb-3'>Your Notes</h3>
			<Spinner />
			<Notes />
		</div>
	);
}
