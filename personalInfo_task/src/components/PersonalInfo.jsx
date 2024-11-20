import React, { useState } from 'react';
import './PersonalInfo.css';

const PersonalInfo = () => {
    const [messageVisible, setMessageVisible] = useState(false);

    const handleClick = () => {
        setMessageVisible(true);
    };

    return (
        <div className="personal-info">
            <h1 className="name">Alim Alimbekovich</h1>
            <p className="position">Frontend Developer</p>
            <p> <strong>Company:</strong> MegaCom</p>
            <p> <strong>Age:</strong> 28 years old</p>
            <p> <strong>Experience:</strong> 8 years</p>
            <p> <strong>Place of residence:</strong> Bishkek, Kyrgyzstan</p>

            {messageVisible && <p className="message">You clicked the button</p>}

            <button className="btn" onClick={handleClick}>
                Click button
            </button>
        </div>
    );
};
export default PersonalInfo;