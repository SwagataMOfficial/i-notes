import React, { useContext } from 'react';
import AllContexts from '../context/AllContexts';

export default function Alert() {
    const context = useContext(AllContexts);
    const { alert } = context;
    return (
        <>
            {alert && <div className={`alert alert-${alert.alertColor} d-flex align-items-center z-1 position-absolute w-100`} role="alert" style={{ 'height': '40px' }}>
                <strong>{alert.alertType}!</strong>&nbsp;{alert.alertMessage}.
            </div>}
        </>
    );
}
