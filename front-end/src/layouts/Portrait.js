import React from 'react';
import {
    Calendar,
    Clock,
    News,
    Quote,
    Trello,
    Trends,
    Weather
} from '../components';

const Portrait = () => {
    return (
        <div className="portrait">
            <div className="row">
                <Clock />
            </div>
            <div className="row">
                <Weather />
            </div>
            <div className="row">
                <div className="col col-6 d-flex flex-column row-gap-1">
                    <Trello />
                    <Quote />
                    <Calendar />
                </div>
                <div className="col col-6 d-flex flex-column row-gap-1">
                    <News />
                    <Trends />
                </div>
            </div>
        </div>
    );
};

export default Portrait;