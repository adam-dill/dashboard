import React from 'react';
import withTime from './WithTimeHOC';
import { Loader } from '../index';

class DigitalClock extends React.Component {

    render() {
        if (!this.props.now) {
            return <Loader />;
        }
        const time = this.props.now.format('h:mm');
        const day = this.props.now.format('dddd');
        const date = this.props.now.format('MMM Do');
        return (
            <div className="col-8 text-center">
                <div className="rem-1000 lh-1 m-0">{time}</div>
                <div className="rem-300 lh-1 m-0">{day}, {date}</div>
            </div>
        );
    }
}
 
export default withTime(DigitalClock);