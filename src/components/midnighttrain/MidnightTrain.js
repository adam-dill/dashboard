import React from 'react';
import moment from 'moment';
import last from 'lodash-es/last';

const UPDATE_DELAY = 1;
const TOLERANCE = 5;

class MidnightTrain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            status: {},
        }
    }

    componentDidMount() {
        this.getData();
        this.updateStatus();
        setInterval(() => {
            this.getData();
            this.updateStatus();
        }, 60000 * 10);
    }

    updateStatus() {
        fetch('http://www.midnighttrain.adamdill.com/status/')
            .then(response => response.json())
            .then(result => {
                const {data} = result;
                if (data) {
                    const newStatus = {};
                    data.forEach(item => newStatus[item.key] = item.value);
                    this.setState({status: newStatus});
                }
            })
            .catch(e => setTimeout(this.updateStatus.bind(this), 1000));
    }

    getData() {
        fetch(`http://www.midnighttrain.adamdill.com/entries/0/50`)
            .then(response => response.json())
            .then(result => {
                const yesterday = moment().subtract(1, 'd').hour(12).minute(0);
                const today = moment().hour(21).minute(0);
                const entries = result.data
                    .filter(value => moment(value.time).isBetween(yesterday, today))
                    .map(value => this.processEntry(value));
                this.setState({data: entries});
            })
            .catch(e => setTimeout(this.getData.bind(this), 1000));
    }

    processEntry(entry) {
        const date = new Date(entry.time.replace(/-/g, '/'));
        const day = date.toDateString();
        const time = this.formatTime(date);
        return {
            date,
            day,
            time,
            duration: ((entry.duration/1000)/60)
        }
    }

    formatTime(date) {
        return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }

    formatDegree(c) {
        if (!c) return null;
        return `${Math.round(c)}&deg;C`;
    }

    isOnline(lastTime, currentTime) {
        if (!lastTime || !currentTime) return false;
        
        return moment(lastTime).add(UPDATE_DELAY, 'minute')
                .isAfter(moment(currentTime).subtract(5, 's'));
    }

    renderEntry(entry, index) {
        const format = value => (value < 10) ? `0${value}` : `${value}`;
        const minutes = Math.floor(entry.duration);
        const seconds = Math.floor(60 * (entry.duration - minutes));
        const display = (minutes !== 0)
            ? `${minutes} min ${format(seconds)} sec`
            : `${format(seconds)} sec`;
        return (
            <div key={index} className={`d-flex justify-content-between border-bottom py-1`}>
                <div>{entry.time}</div>
                <small> {display}</small>
            </div>
        );
    }

    renderStatus() {
        const {temperature, lastUpdate, CURRENT_TIMESTAMP} = this.state.status;
        const online = this.isOnline(lastUpdate, CURRENT_TIMESTAMP);
        const onlineText = online ? 'online' : 'offline';
        const onlineStyle = online ? 'badge-success' : 'badge-danger';
        const temperatureDisplay = (online) ? this.formatDegree(temperature) : null;

        return (
            <>
                <span className="small pointer"
                    dangerouslySetInnerHTML={{__html:temperatureDisplay}} 
                    onClick={this.handleTemperatureClick} />
                <span className={`badge ${onlineStyle} ml-2 p-2 text-uppercase`}>{onlineText}</span>
            </>
        )
    }

    render() {
        const items = this.state.data
            .map((value, index) => this.renderEntry(value, index));
        return (
            <div className="mt-5">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="title">Midnight Train</div>
                    <div>{this.renderStatus()}</div>
                </div>
                {items}
            </div>
        );
    }
}
 
export default MidnightTrain;