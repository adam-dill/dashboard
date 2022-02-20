import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { fetchQuote } from '../redux/actions/quoteAction';

const Quote = (props) => {
    const { error, loading, lastUpdate, data } = props;
    const date = new Date(lastUpdate);

    useEffect(() => {
        props.dispatch(fetchQuote());
    }, []);

    return (
        <div>
            <p>Quote Last Update: {date.toLocaleTimeString()}</p>
            <p className="response">{JSON.stringify(data)}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.quote.lastUpdate,
    loading: state.quote.loading,
    error: state.quote.error,
    data: state.quote.data,
  });

export default connect(mapStateToProps)(Quote);