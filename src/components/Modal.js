import React, { useState } from 'react';

const Modal = (props) => {
    // TODO: plan is that make a state where the edit button click will update the state and add button value to the state and fetch that button value from there and use it for api call below. Also use another state to track the newly updated note as well as old note.

    const updateNote = async (e) => {
        e.preventDefault();
        console.log("Updating Note...");
        const response = await fetch('http://127.0.0.1:8000/api/notes/update', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ authtoken: localStorage.getItem('authToken'), note: props.updateText, noteId: props.updateNoteID })
        });
        const json = await response.json();
        console.log(json);
        props.setprogress(70);
        if (json.success) {
            props.showAlert('success', json.successMessage, 'Success');
        } else {
            props.showAlert('danger', json.errorMessage, 'Error');
        }
        props.setprogress(100);
        props.getNotes();
    };

    return (
        <div className="modal fade" id="updateNoteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form action='http://127.0.0.1:8000/api/notes/update' method='POST' onSubmit={updateNote} id='updateNoteForm'>
                            <div className="mb-3">
                                <input type='hidden' name='noteID' value={props.updateNoteID} />
                                <label htmlFor="note" className="form-label">Your Note</label>
                                <textarea className="form-control" name='noteText' id="note" rows="3" required value={props.updateText} onChange={(e) => {
                                    // setnoteText(e.value);
                                    props.setupdateText(e.value);
                                }}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" form='updateNoteForm'>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;