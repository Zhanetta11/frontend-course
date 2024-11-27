import React, { useState, useEffect } from 'react';
import './DataFilter.css';

const nameData = [
    { id: 1, name: 'Azamat' },
    { id: 2, name: 'Bektur' },
    { id: 3, name: 'Ali' },
    { id: 4, name: 'Dastan' },
    { id: 5, name: 'Nuremir' },
    { id: 6, name: 'Ruslan' },
    { id: 7, name: 'Ulan' },
    { id: 8, name: 'Sanjar' },
    { id: 9, name: 'Ilnar' },
    { id: 10, name: 'Mirbek' },
];

const DataFilter = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setData(nameData);
    }, []);

    return (
        <div>
            <h1>Data Filtering</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default DataFilter;