import React from 'react';
import { connect } from "react-redux";

const Errors = ({errors}) => {
    
    const filtered = errors
        .filter(value => !!value);
    if (filtered.length === 0) return null;
    return (
        <div>
            {filtered.map((value, index) => {
                if (value) {
                    return <div key={index} className="alert alert-danger">
                        <span>[{value.title}] </span>
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
        state.trends.error,
        state.weather.error
    ]
});

export default connect(mapStateToProps)(Errors);