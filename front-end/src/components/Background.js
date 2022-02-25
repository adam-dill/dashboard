import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { fetchBackground } from '../redux/actions/backgroundAction';

const Background = (props) => {
    const { error, loading, lastUpdate, data } = props;
    const date = new Date(lastUpdate);

    useEffect(() => {
        props.dispatch(fetchBackground());
    }, []);

    return (
        <div>
            <p>Background Last Update: {date.toLocaleTimeString()}</p>
            <p className="code">{JSON.stringify(data)}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.background.lastUpdate,
    loading: state.background.loading,
    error: state.background.error,
    data: state.background.data,
});

export default connect(mapStateToProps)(Background);