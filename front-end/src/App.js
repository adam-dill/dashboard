import React from 'react';
import Clock from './components/Clock';
import Weather from './components/Weather';
import News from './components/News';
import Calendar from './components/Calendar';
import Background from './components/Background';
import Quote from './components/Quote';
import Trends from './components/Trends';
import Trello from './components/Trello';

function App() {

    return (
        <>  
            <Clock />
            <News />
            <Calendar />
            <Weather />
            <Background />
            <Quote />
            <Trello />
            <Trends />
        </>
    );
}

export default App;
