import React, { useContext } from 'react';
import AllContexts from '../context/AllContexts';

export default function NoteItem(props) {
    const { showAlert, setprogress,getNotes, setupdateText, setupdateNoteID } = useContext(AllContexts);

    const handleDelete = async (e) => {
        setprogress(30);
        const response = await fetch(`http://127.0.0.1:8000/api/notes/delete`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ authtoken: localStorage.getItem('authToken'), noteId: e.target.value })
        });
        const json = await response.json();
        setprogress(60);
        if (json.success) {
            showAlert("success", json.successMessage, "Success");
        } else {
            showAlert("danger", json.errorMessage, "Error");
        }
        setprogress(100);
        getNotes();
    };
    return (
        <tr>
            <th scope="row">{props.slNo}</th>
            <td>{props.note}</td>
            <td style={{ "width": "20%" }}>
                <button type="button" className="btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#updateNoteModal" value={props.noteID} onClick={(e) => {
                    setupdateNoteID(e.target.value);
                    setupdateText(e.target.parentNode.parentNode.children[1].innerText);
                }}>
                    Edit
                </button>
                <button className='btn btn-danger mx-1' value={props.noteID} onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
}
