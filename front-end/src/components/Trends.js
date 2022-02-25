import React from 'react';
import { connect } from "react-redux";

const Trends = (props) => {
    const { error, loading, lastUpdate, data } = props;
    const date = new Date(lastUpdate);

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }

    return (
        <div>
            <p>Trends Last Update: {date.toLocaleTimeString()}</p>
            <p className="code">{JSON.stringify(data)}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.trends.lastUpdate,
    loading: state.trends.loading,
    error: state.trends.error,
    data: state.trends.data,
  });

export default connect(mapStateToProps)(Trends);