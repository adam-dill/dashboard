import React from 'react';
import { connect } from "react-redux";

const Errors = ({errors}) => {

    const filtered = errors
        .filter(value => !!value)
        .map(value => value.message);
    if (filtered.length === 0) return null;
    return (
        <div>
            {filtered.map((value, index) => {
                if (value) {
                    return <div key={index} className="alert alert-danger">{value}</div>;
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
        state.trends.error,
        state.weather.error
    ]
});

export default connect(mapStateToProps)(Errors);