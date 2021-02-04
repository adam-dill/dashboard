import React from 'react';
import { Background, DigitalClock, InternationalClock, WeatherStrip, MiniCalendar, MidnightTrain, Headlines, Trello, Quote } from './components';

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
                        <WeatherStrip />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Quote />
                            <MidnightTrain />
                            <MiniCalendar />
                        </div>
                        <div className="col-6">
                            <Headlines />
                            <Trello />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


 
export default App;
