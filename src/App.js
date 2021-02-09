import React from 'react';
import { Background, DigitalClock, InternationalClock, WeatherStrip, MiniCalendar, MidnightTrain, Headlines, Trello, Quote } from './components';
import {Keys} from './API';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: Background
        }
    }

    render() { 
        return (
            <div className="vw-100 vh-100">
                <Background />
                <div className="container">
                    <div className="row my-4">
                        <DigitalClock />
                        <InternationalClock values={['nyc', 'la']} />
                    </div>
                    <div className="row">
                        <WeatherStrip api={Keys.WEATHER} />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Quote />
                            <MidnightTrain />
                            <MiniCalendar api={Keys.CALENDAR} />
                        </div>
                        <div className="col-6">
                            <Headlines api={Keys.NEWS} />
                            <Trello api={Keys.TRELLO} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
