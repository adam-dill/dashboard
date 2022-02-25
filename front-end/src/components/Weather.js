import React from 'react';
import { connect } from "react-redux";

const Weather = (props) => {
    const { error, loading, lastUpdate, data } = props;
    const date = new Date(lastUpdate);

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }

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