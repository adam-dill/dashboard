import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { fetchNews } from '../redux/actions/newsAction';

const News = (props) => {
    const { error, loading, lastUpdate, articles } = props;
    const date = new Date(lastUpdate);

    useEffect(() => {
        props.dispatch(fetchNews());
    }, []);

    return (
        <div>
            <p>News Last Update: {date.toLocaleTimeString()}</p>
            <p className="code">{JSON.stringify(articles)}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.news.lastUpdate,
    loading: state.news.loading,
    error: state.news.error,
    articles: state.news.articles,
  });

export default connect(mapStateToProps)(News);