import React from 'react';

export default function Alert(props) {
    return (
        <>
            {props.alert && <div className={`alert alert-${props.alert.alertColor} d-flex align-items-center z-1 position-absolute w-100`} role="alert" style={{ 'height': '40px' }}>
                <strong>{props.alert.alertType}!</strong>&nbsp;{props.alert.alertMessage}.
            </div>}
        </>
    );
}
