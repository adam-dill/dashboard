import React from 'react';
import { connect } from "react-redux";

const Clock = ({est, pst, cst}) => {

    return (
        <div className="clock-container">
            <div className="current-time">
                {cst}
            </div>
            <div className="other-time">
                <div>NY: {est}</div>
                <div className="seperator"></div>
                <div>LA: {pst}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    ...state,
    est: state.clock.est,
    pst: state.clock.pst,
    cst: state.clock.cst
});

export default connect(mapStateToProps)(Clock);