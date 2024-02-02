import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoteInput(props) {
    const navigate = useNavigate();

    const [note, setnote] = useState("");
    const [noteBtn, setnoteBtn] = useState("Add Note");

    const handleOnChange = (e) => {
        setnote(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setnoteBtn("Adding Note...");
        props.setprogress(30);
        const response = await fetch('http://127.0.0.1:8000/api/notes/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ authtoken: localStorage.getItem('authToken'), 'note': note })
        });
        const json = await response.json();
        console.log(json);
        props.setprogress(70);
        if (json.success) {
            setnoteBtn("Add Note");
            setnote("");
            props.showAlert('success', json.successMessage, 'Success');
            navigate('/');
        } else {
            setnoteBtn("Add Note");
            props.showAlert('danger', json.errorMessage, 'Error');
        }
        props.setprogress(100);
        props.getNotes();
    };

    return (
        <form action='' className='my-3' onSubmit={handleSubmit}>
            <h2 className='text-center mt-3 mb-2'>Enter Your Notes</h2>
            <div className="mb-3">
                <textarea className="form-control" id="note" name='note' rows="5" placeholder='Enter Note here....' value={note} onChange={handleOnChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">{noteBtn}</button>
        </form>
    );
}
