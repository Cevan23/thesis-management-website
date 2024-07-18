import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(response => setItems(response.data));
    }, []);

    const addItem = () => {
        axios.post('http://localhost:5000/items', { name })
            .then(response => setItems([...items, response.data]));
        setName('');
    };

    return (
        <div>
            <h1>Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button onClick={addItem}>Add Item</button>
        </div>
    );
};

export default App;
