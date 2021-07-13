import React from 'react';
import SunImg from '../png/sun.png';

function Status(){
    return (
        <>
        <div className="status-container">
            <div>
                <img src={SunImg} alt="Sun" />
            </div>
        </div>
        </>
    ) 
}

export default Status;