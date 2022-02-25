import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { fetchWeather } from '../redux/actions/weatherAction';

const Weather = (props) => {
    const { error, loading, lastUpdate, data } = props;
    const date = new Date(lastUpdate);

    useEffect(() => {
        props.dispatch(fetchWeather());
    }, []);

    return (
        <div>
            <p>Weather Last Update: {date.toLocaleTimeString()}</p>
            <p className="code">{JSON.stringify(data)}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.weather.lastUpdate,
    loading: state.weather.loading,
    error: state.weather.error,
    data: state.weather.data,
  });

export default connect(mapStateToProps)(Weather);