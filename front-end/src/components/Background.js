import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { fetchBackground } from '../redux/actions/backgroundAction';
import Image from './Image';

const Background = (props) => {
    const { error, loading, lastUpdate, images } = props;
    const date = new Date(lastUpdate);

    useEffect(() => {
        props.dispatch(fetchBackground());
    }, []);

    
    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }

    return (
        <div>
            <p>Background Last Update: {date.toLocaleTimeString()}</p>
            <p className="code">{JSON.stringify(images)}</p>
            
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.background.lastUpdate,
    loading: state.background.loading,
    error: state.background.error,
    images: state.background.images
});

export default connect(mapStateToProps)(Background);