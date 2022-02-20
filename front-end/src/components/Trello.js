import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { fetchTrello } from '../redux/actions/trelloAction';

const Trello = (props) => {
    const { error, loading, lastUpdate, data } = props;
    const date = new Date(lastUpdate);

    useEffect(() => {
        props.dispatch(fetchTrello());
    }, []);

    return (
        <div>
            <p>Trello Last Update: {date.toLocaleTimeString()}</p>
            <p className="response">{JSON.stringify(data)}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.trello.lastUpdate,
    loading: state.trello.loading,
    error: state.trello.error,
    data: state.trello.data,
  });

export default connect(mapStateToProps)(Trello);