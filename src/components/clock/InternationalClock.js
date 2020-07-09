import React from 'react';
import withTime from './WithTimeHOC';
import { Loader } from '../index';

class InternationalClock extends React.Component {
    
    render() { 
        const {now} = this.props;
        if (!now) {
            return <Loader />;
        }
        const nyTime = now.clone().add(1, 'h').format('h:mm a');
        const laTime = now.clone().subtract(2, 'h').format('h:mm a');
        return (
            <div className="flex-grow-1 d-flex rem-200">
                <div className="flex-grow-1"></div>
                <div className="international-times flex-grow-1 d-flex flex-column justify-content-center">
                    <div className="d-flex justify-content-between py-1">
                        <div>NY</div>
                        <div>{nyTime}</div>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                        <div>LA</div>
                        <div>{laTime}</div>
                    </div>
                </div>    
            </div>        
        );
    }
}
 
export default withTime(InternationalClock);