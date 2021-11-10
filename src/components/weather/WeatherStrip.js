import React from 'react';
import get from 'lodash-es/get';
import moment from 'moment';
import Day1 from '../../assets/images/weather/day-1.png';
import Day2 from '../../assets/images/weather/day-2.png';
import Day3 from '../../assets/images/weather/day-3.png';
import Day4 from '../../assets/images/weather/day-4.png';
import Day5 from '../../assets/images/weather/day-5.png';
import Day7 from '../../assets/images/weather/day-7.png';
import Day8 from '../../assets/images/weather/day-8.png';
import Day9 from '../../assets/images/weather/day-9.png';

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
            data: [],
            latitude: 43.0490693,
            longitude: -88.0059109
        }
        this.fetchData = this.fetchData.bind(this);
    }
    
    componentDidMount() {
        setInterval(this.fetchData, 60000 * 60);
        this.fetchData();
    }

    fetchData() {
        const {latitude, longitude} = this.state;
        if (!latitude || !longitude) {
            return;
        }
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&units=imperial&appid=${this.props.api}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    data: this.parseData(data)
                })
            })
            .catch(e => setTimeout(this.fetchData, 1000));
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
                <div key={index} className="panel col px-3 py-5 mx-1 text-center">
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