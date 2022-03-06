import React from 'react';
import {
    Calendar,
    Clock,
    Errors,
    News,
    Quote,
    Trello,
    Weather
} from '../components';

const Portrait = () => {
    return (
        <div className="portrait">
            <div className="row mb-4">
                <Clock />
            </div>
            <div className="row mb-4">
                <Weather />
            </div>
            <div className="row">
                <div className="col col-6 d-flex flex-column row-gap-1">
                    <Errors />
                    <Quote />
                    <Trello />
                    <Calendar />
                </div>
                <div className="col col-6 d-flex flex-column row-gap-1">
                    <News />
                </div>
            </div>
        </div>
    );
};

export default Portrait;