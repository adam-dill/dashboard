import React from 'react';
import get from 'lodash-es/get';
import moment from 'moment';
import Day1 from '../../assets/images/weather/day-1.png';
import Day2 from '../../assets/images/weather/day-2.png';
import Day3 from '../../assets/images/weather/day-3.png';
import Day4 from '../../assets/images/weather/day-4.png';
import Day5 from '../../assets/images/weather/day-5.png';
import Day6 from '../../assets/images/weather/day-6.png';
import Day7 from '../../assets/images/weather/day-7.png';
import Day8 from '../../assets/images/weather/day-8.png';
import Day9 from '../../assets/images/weather/day-9.png';
import Night1 from '../../assets/images/weather/night-1.png';
import Night2 from '../../assets/images/weather/night-2.png';
import Night3 from '../../assets/images/weather/night-3.png';
import Night4 from '../../assets/images/weather/night-4.png';
import Night5 from '../../assets/images/weather/night-5.png';
import Night6 from '../../assets/images/weather/night-6.png';
import Night7 from '../../assets/images/weather/night-7.png';
import Night8 from '../../assets/images/weather/night-8.png';
import Night9 from '../../assets/images/weather/night-9.png';

// https://openweathermap.org/api/one-call-api
const API_KEY = "220bb8d4c31c356359f76bfe6f628169";

const LAT = 43.0389025;
const LON = -87.9064736;

const ICON = {
    '01d': Day1,
    '02d': Day2,
    '03d': Day3,
    '04d': Day4,
    '09d': Day7,
    '10d': Day8,
    '11d': Day9,
    '13d': Day5,
    '50d': Day4,
}

class WeatherStrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    
    componentDidMount() {
        /*
        this.setState({
            data: this.parseData(mockdata)
        })
        return;
        */
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&
        exclude=hourly,daily&units=imperial&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: this.parseData(data)
                })
            });
    }

    parseData(data) {
        return get(data, 'daily', [])
            .filter((value, index) => index < 5)
            .map(value => {
                const day = moment.unix(parseInt(get(value, 'dt', 0))).format('ddd');
                const temp = parseInt(get(value, 'temp.day', 0));
                const max = parseInt(get(value, 'temp.max', 0));
                const min = parseInt(get(value, 'temp.min', 0));
                const label = get(value, 'weather.0.main');
                const icon = ICON[get(value, 'weather.0.icon')];
                return {day, temp, max, min, label, icon};
            });
    }

    render() { 
        const items = this.state.data.map((value, index) => {
            return (
                <div key={index} className="panel col px-3 py-3 mx-1 text-center">
                    <div className="text-info fw-700">{value.day.toUpperCase()}</div>
                    <div className="rem-250 my-5">{value.temp}&deg;</div>
                    <div className="rem-150">{value.label}</div>
                    <div>{value.min}&deg; to {value.max}&deg;</div>
                    <img src={value.icon} className="background-image mw-100" />
                </div>
            );
        })
        return (
            <div className="d-flex w-100 overflow-hidden my-3">{items}</div>
        );
    }
}
 
export default WeatherStrip;