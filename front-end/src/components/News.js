import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { fetchNews } from '../redux/actions/newsAction';

const News = (props) => {
    const { error, loading, lastUpdate, data } = props;
    const date = new Date(lastUpdate);

    useEffect(() => {
        props.dispatch(fetchNews());
    }, []);

    return (
        <div>
            <p>News Last Update: {date.toLocaleTimeString()}</p>
            <p className="response">{JSON.stringify(data)}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.news.lastUpdate,
    loading: state.news.loading,
    error: state.news.error,
    data: state.news.data,
  });

export default connect(mapStateToProps)(News);