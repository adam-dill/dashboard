import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { fetchTrello } from '../redux/actions/trelloAction';

const Trello = (props) => {
    const { error, loading, lastUpdate, items } = props;
    const date = new Date(lastUpdate);

    useEffect(() => {
        props.dispatch(fetchTrello());
    }, []);

    return (
        <div>
            <p>Trello Last Update: {date.toLocaleTimeString()}</p>
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