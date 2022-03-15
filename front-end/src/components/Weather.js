import React from 'react';
import { connect } from "react-redux";

import Day1 from '../assets/images/weather/day-1.png';
import Day2 from '../assets/images/weather/day-2.png';
import Day3 from '../assets/images/weather/day-3.png';
import Day4 from '../assets/images/weather/day-4.png';
import Day5 from '../assets/images/weather/day-5.png';
import Day7 from '../assets/images/weather/day-7.png';
import Day8 from '../assets/images/weather/day-8.png';
import Day9 from '../assets/images/weather/day-9.png';

const Icon = {
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

const Weather = (props) => {
    const { error, loading, forcast, color } = props;

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }

    const getDay = ({day, temp, min, max, label, icon}, index) => {
        return (
            <div key={index} className="weather-tile">
                <div>
                    <h3>{day.substr(0, 3)}</h3>
                    <h2>{temp}<span className="position-absolute">&deg;</span></h2>
                    <div>{min}&deg; to {max}&deg;</div>
                    <div>{label}</div>
                </div>
                <img src={Icon[icon]} alt="" />
            </div>
        )
    }

    const getForcast = () => {
        return forcast.map(getDay);
    }

    return (
        <div className="weather-container">
            {getForcast()}
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.weather.loading,
    error: state.weather.error,
    forcast: state.weather.forcast,
    color: state.background.color,
  });

export default connect(mapStateToProps)(Weather);