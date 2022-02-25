import React from 'react';
import { connect } from "react-redux";

const Calendar = (props) => {
    const { error, loading, lastUpdate, dates } = props;
    const date = new Date(lastUpdate);

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }
    
    return (
        <div>
            <p>Calendar Last Update: {date.toLocaleTimeString()}</p>
            <p className="code">{JSON.stringify(dates)}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.calendar.lastUpdate,
    loading: state.calendar.loading,
    error: state.calendar.error,
    dates: state.calendar.dates,
  });

export default connect(mapStateToProps)(Calendar);