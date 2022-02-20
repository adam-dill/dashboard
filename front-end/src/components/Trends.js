import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { fetchTrends } from '../redux/actions/trendsAction';

const Trends = (props) => {
    const { error, loading, lastUpdate, data } = props;
    const date = new Date(lastUpdate);

    useEffect(() => {
        props.dispatch(fetchTrends());
    }, []);

    return (
        <div>
            <p>Trends Last Update: {date.toLocaleTimeString()}</p>
            <p className="response">{JSON.stringify(data)}</p>
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