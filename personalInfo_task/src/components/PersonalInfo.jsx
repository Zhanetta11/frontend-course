import React, { useState } from 'react';
import './PersonalInfo.css';

const PersonalInfo = () => {
    const [messageVisible, setMessageVisible] = useState(false);
    const [position, setPosition] = useState('Middle Frontend Developer');

    const handleClick = () => {
        setMessageVisible(true);
        setPosition('Senior Frontend Developer');
    };

    return (
        <div className="personal-info">
            <h1 className="name">Alim Alimbekovich</h1>
            <p className="position">{position}</p>
            <p> <strong>Company:</strong> MegaCom</p>
            <p> <strong>Age:</strong> 28 years old</p>
            <p> <strong>Experience:</strong> 8 years</p>
            <p> <strong>Place of residence:</strong> Bishkek, Kyrgyzstan</p>

            {messageVisible && <p className="message">You have successfully promoted the position</p>}

            <button className="btn" onClick={handleClick}>
                Promote
            </button>
        </div>
    );
};
export default PersonalInfo;