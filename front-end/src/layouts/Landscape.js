import React from 'react';
import {
    Calendar,
    Clock,
    Quote,
    Trello,
    Weather,
    Errors
} from '../components';

const Landscape = () => {
    return (
        <div className="landscape">
            <div className="row mb-4">
                <div className="col col-3">
                    <Clock />
                </div>
                <div className="col col-9">
                    <Weather />
                </div>
            </div>
            <div className="row">
                <div className="col col-4 d-flex flex-column row-gap-1">
                    <Trello />
                    <Calendar />
                </div>
                <div className="col col-4 d-flex flex-column row-gap-1">
                    
                </div>
                <div className="col col-4 d-flex flex-column row-gap-1">
                    <Quote />
                    <Errors />
                </div>
            </div>
        </div>
    );
};

export default Landscape;