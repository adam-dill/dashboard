import React from 'react';
import { connect } from "react-redux";

const Clock = ({est, pst, cst, month, day, date}) => {

    return (
        <div className={`clock-container`}>
            <div className="current-time">
                <div>
                    {est}
                    <div className="date">{day}, {month.substr(0, 3)} {date}</div>
                </div>
            </div>
            <div className="other-time">
                <div><span className="mute">CHI:</span> {cst}</div>
                <div className="seperator"></div>
                <div><span className="mute">LA:</span> {pst}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    ...state,
    est: state.clock.est,
    pst: state.clock.pst,
    cst: state.clock.cst,
    month: state.clock.month,
    day: state.clock.day,
    date: state.clock.date,
});

export default connect(mapStateToProps)(Clock);