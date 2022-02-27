import React from 'react';
import { connect } from "react-redux";

const Trello = (props) => {
    const { error, loading, lastUpdate, items } = props;

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }

    if (items && items.length === 0) return null;
    return (
        <div className="trello-container">
            <h3>To-Do <em className="last-update">{lastUpdate}</em></h3>
            <div>
                {items.map((value, index) => <div key={index}>{value}</div>)}
            </div>
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