import React, { useContext } from 'react';
import AllContexts from '../context/AllContexts';

const Modal = () => {
    const { showAlert, setprogress,getNotes, updateNoteID, updateText, setupdateText } = useContext(AllContexts);

    const updateNote = async (e) => {
        e.preventDefault();
        document.getElementById('closeBtn').click();
        const response = await fetch('http://127.0.0.1:8000/api/notes/update', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ authtoken: localStorage.getItem('authToken'), note: updateText, noteId: updateNoteID })
        });
        const json = await response.json();
        console.log(json);
        setprogress(70);
        if (json.success) {
            showAlert('success', json.successMessage, 'Success');
        } else {
            showAlert('danger', json.errorMessage, 'Error');
        }
        setprogress(100);
        getNotes();
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
                                <input type='hidden' name='noteID' value={updateNoteID} />
                                <label htmlFor="note" className="form-label">Your Note</label>
                                <textarea className="form-control" name='noteText' id="note" rows="3" required value={updateText} onChange={(e) => {
                                    setupdateText(e.target.value);
                                }}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='closeBtn'>Close</button>
                        <button type="submit" className="btn btn-primary" form='updateNoteForm'>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;