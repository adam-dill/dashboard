import React from 'react';
import { connect } from "react-redux";

const Quote = (props) => {
    const { error, loading, lastUpdate, quote, author } = props;

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }

    return (
        <div className="quote-container">
            <h3>Quote <em className="last-update">{lastUpdate}</em></h3>
            <div className="quote">{quote}</div>
            <div className="author">{author}</div>
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