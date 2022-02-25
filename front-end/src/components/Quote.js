import React from 'react';
import { connect } from "react-redux";

const Quote = (props) => {
    const { error, loading, lastUpdate, quote, author } = props;
    const date = new Date(lastUpdate);

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }

    return (
        <div>
            <p>Quote Last Update: {date.toLocaleTimeString()}</p>
            <p className="code">{JSON.stringify(quote)} - {author}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.quote.lastUpdate,
    loading: state.quote.loading,
    error: state.quote.error,
    quote: state.quote.quote,
    author: state.quote.author
  });

export default connect(mapStateToProps)(Quote);