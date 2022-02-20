import React, {useEffect, useState} from 'react';
import Clock from './components/Clock';

function App() {
    const [message, setMessage] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/weather')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(console.error);
    }, []);

    return (
        <>
            <div>{message}</div>
            <Clock />
        </>
    );
}

export default App;
