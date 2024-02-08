import React, { useContext, useState } from 'react';
import NoteItem from './NoteItem';
import Modal from './Modal';
import AllContexts from '../context/AllContexts';

export default function Notes() {
    
    const { loading, notes } = useContext(AllContexts);

    if (!loading) {
        if (notes.length > 0) {
            return (
                <>
                    <Modal />
                    <table className="table table-xxl table-bordered table-striped table-hover" >
                        <thead>
                            <tr>
                                <th scope="col">S.L. No.</th>
                                <th scope="col">Note</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {notes.map((e, no = 0) => {
                                no += 1;
                                return <NoteItem slNo={no} noteID={e.sl_no} note={e.note} key={e.sl_no} token={e.authtoken} />;
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
