import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

const Calendar = (props) => {
    const { error, loading, lastUpdate, dates } = props;
    const [display, setDisplay] = useState({});

    useEffect(() => {
        let group = {};
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        dates.forEach(element => {
            const date = new Date(element.date)
            let format = date.toLocaleDateString([], options);
            const nth = date.getDate().nth();
            format = format.replace(date.getDate(), nth);
            if (!group[format]) {
                group[format] = [];
            }
            group[format].push(element.name);
        });
        setDisplay(group);
    }, [setDisplay, dates]);

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }
    
    const getDisplay = () => {
        const returnValue = [];
        for(let key in display) {
            returnValue.push (
                <div key={key}>
                    <div className="date">{key}</div>
                    <div className="items">
                        {display[key].map((value, index) => <div key={index}>{value}</div>)}
                    </div>
                </div>
            );
        }
        return returnValue;
    };
    
    return (
        <div className="calendar-container">
            <h3>Calendar <em className="last-update">{lastUpdate}</em></h3>
            {display && getDisplay()}
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