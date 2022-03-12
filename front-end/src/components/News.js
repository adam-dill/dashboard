import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

const News = (props) => {
    const { error, loading, lastUpdate, articles, max=4, delay=90000 } = props;
    const [display, setDisplay] = useState([]);

    useEffect(() => {
        setDisplay(JSON.parse(JSON.stringify(articles)));
    }, [articles]);

    useEffect(() => {
        const interval = setInterval(() => {
            const dup = JSON.parse(JSON.stringify(display));
            const removed = dup.splice(0, max);
            dup.push(...removed);
            setDisplay(dup);
        }, delay);

        return () => clearInterval(interval);
    }, [display, setDisplay, max, delay]);
    

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }

    const getHeadline = ({title, source}, index) => {
        return (
            <div key={index} className="article">
                <div className="title">{title}</div>
                <div className="source">{source}</div>
            </div>
        );
    };

    const getNews = () => {
        return display
            .filter((value, index) => index < max)
            .map(getHeadline);
    }

    return (
        <div className="news-container">
            <h3>News <em className="last-update">{lastUpdate}</em></h3>
            <div className="articles">
                {display && getNews()}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.news.loading,
    error: state.news.error,
    lastUpdate: state.news.lastUpdate,
    articles: state.news.articles,
  });

export default connect(mapStateToProps)(News);