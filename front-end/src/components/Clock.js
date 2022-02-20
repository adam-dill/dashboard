import React from 'react';
import { connect } from "react-redux";

const Clock = ({time}) => {

    return (
        <div>
            {time && time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
        </div>
    );
};

const mapStateToProps = (state) => ({
    ...state,
    time: state.clock.time
});

export default connect(mapStateToProps)(Clock);