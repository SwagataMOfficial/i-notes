import React, { useContext } from 'react';
import AllContexts from '../context/AllContexts';

export default function Spinner() {
    const { display } = useContext(AllContexts);

    return (
        <div className={`container-fluid mt-3 row align-items-center justify-content-center d-${display}`}>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
