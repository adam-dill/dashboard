import React from 'react';
import { connect } from "react-redux";

const Trello = (props) => {
    const { error, loading, lastUpdate, items } = props;
    const date = new Date(lastUpdate);

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }

    return (
        <div>
            <h3>Trello <em className="last-update">{lastUpdate}</em></h3>
            <p className="code">{JSON.stringify(items)}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.trello.lastUpdate,
    loading: state.trello.loading,
    error: state.trello.error,
    items: state.trello.items,
  });

export default connect(mapStateToProps)(Trello);