import { useState } from 'react';
import AllContexts from './AllContexts';

const NoteContext = (props) => {
    // all states are defined here
    const [alert, setalert] = useState(null);
    const [progress, setprogress] = useState(0);
    const [notes, setnotes] = useState([]);
    const [display, setdisplay] = useState('none');
    const [loading, setloading] = useState(false);
    const [updateText, setupdateText] = useState("");
    const [updateNoteID, setupdateNoteID] = useState(0);

    // all hooks are defined here
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

	const getNotes = async () => {
		setloading(true);
		setdisplay("flex");
		setprogress(40);
		const response = await fetch('http://127.0.0.1:8000/api/notes/get', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ authtoken: localStorage.getItem('authToken') })
		});
		setprogress(75);
		const json = await response.json();
		// console.log(json);
		setnotes(json);
		setprogress(100);
		setdisplay('none');
		setloading(false);
	};

    return (
        <AllContexts.Provider value={{ alert, showAlert, progress, setprogress, getNotes,display,notes, loading,updateText,setupdateText, updateNoteID, setupdateNoteID }}>
            {props.children}
        </AllContexts.Provider>
    );
};

export default NoteContext;