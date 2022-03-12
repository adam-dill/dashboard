import React from 'react';
import { connect } from "react-redux";
import { formatLastUpdate } from '../redux/reducers/rootReducer';

const Errors = ({errors, dispatch}) => {
    
    const filtered = errors
        .filter(value => !!value);
    if (filtered.length === 0) return null;

    filtered.forEach(element => {
        if (!element.timeout)
            element.timeout = setTimeout(() => dispatch(element.recall()), 120000);
    });
    return (
        <div>
            {filtered.map((value, index) => {
                if (value) {
                    return <div key={index} className="alert alert-danger">
                        <span>{formatLastUpdate(value.lastUpdate)} [{value.title}] </span>
                        <em>{value.message}</em>
                    </div>;
                }
                return null;
            })}
        </div>
    );
};

const mapStateToProps = state => ({
    errors: [
        state.background.error,
        state.calendar.error,
        state.news.error,
        state.quote.error,
        state.trello.error,
        state.weather.error
    ]
});

export default connect(mapStateToProps)(Errors);