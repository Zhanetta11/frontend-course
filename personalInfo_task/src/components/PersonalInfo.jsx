import React from 'react';
import './PersonalInfo.css';

const PersonalInfo = () => {
    return (
        <div className="personal-info">
            <h1 className="name">Alim Alimbekovich</h1>
            <p className="position">Frontend Developer</p>
            <p> <strong>Company:</strong> MegaCom</p>
            <p> <strong>Age:</strong> 28 years old</p>
            <p> <strong>Experience:</strong> 8 years</p>
            <p> <strong>Place of residence:</strong> Bishkek, Kyrgyzstan</p>

            <button className="btn">
                Click button
            </button>
        </div>
    );
};
export default PersonalInfo;