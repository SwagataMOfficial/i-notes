import React, { useState } from 'react';
import NoteItem from './NoteItem';
import Modal from './Modal';

export default function Notes(props) {
    // const [eventObj, seteventObj] = useState(null);
    const [updateText, setupdateText] = useState("");
    const [updateNoteID, setupdateNoteID] = useState(0);
    if (!props.loading) {
        if (props.notes.length > 0) {
            return (
                <>
                    <Modal setprogress={props.setprogress} showAlert={props.showAlert} updateText={updateText} updateNoteID={updateNoteID} setupdateText={setupdateText} getNotes={props.getNotes} />
                    <table className="table table-xxl table-bordered table-striped table-hover" >
                        <thead>
                            <tr>
                                <th scope="col">S.L. No.</th>
                                <th scope="col">Note</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {props.notes.map((e, no = 0) => {
                                no += 1;
                                return <NoteItem getNotes={props.getNotes} setprogress={props.setprogress} slNo={no} noteID={e.sl_no} note={e.note} key={e.sl_no} token={e.authtoken} showAlert={props.showAlert} setupdateNoteID={setupdateNoteID} setupdateText={setupdateText} />;
                            })}
                        </tbody>
                    </table >
                </>

            );
        }
        else {
            return <h4 className='text-center text-danger mt-4'>No notes found</h4>;
        }
    }
}
