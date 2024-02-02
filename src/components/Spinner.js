import React from 'react';

export default function Spinner(props) {
    return (
        <div className={`container-fluid mt-3 row align-items-center justify-content-center d-${props.display}`}>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
