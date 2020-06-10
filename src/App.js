import React from 'react';
import Background from './assets/images/wallpaper/milwaukee.jpg';
import { DigitalClock, InternationalClock, WeatherStrip, MiniCalendar, MidnightTrain, Headlines } from './components';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: Background
        }
    }

    componentDidMount() {
        document.body.addEventListener('mousemove', () => {
            document.body.classList.remove('nocuror');
            clearTimeout(this.mouseMovementTimer);
            this.mouseMovementTimer = setTimeout(() => {
                document.body.classList.add('nocuror');
            }, 3000)
        })
    }

    render() { 
        return (
            <div className="vw-100 vh-100">
                <img src={this.state.backgroundImage} className="background-image vw-100 vh-100 opacity-3" />
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
                            <MiniCalendar title="Today" />
                            <div className="mt-4"></div>
                            <MiniCalendar title="Tomorrow" />
                        </div>
                        <div className="col-6">
                            <Headlines />
                            <MidnightTrain />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default App;
