import React from 'react';
import moment from 'moment';
import get from 'lodash-es/get';
import { lte } from 'lodash-es';

const UPDATE_DELAY = 1;

class MidnightTrain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            status: {},
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        this.updateStatus();
        setInterval(() => {
            this.fetchData();
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

    fetchData() {
        fetch(`http://www.midnighttrain.adamdill.com/entries/0/50`)
            .then(response => response.json())
            .then(result => {
                const yesterday = moment().subtract(1, 'd').hour(12).minute(0);
                const entries = result.data
                    .filter(value => moment(value.time).isBetween(yesterday, moment()))
                    .map(value => this.processEntry(value));
                this.setState({data: entries});
            })
            .catch(e => {
                this.setState({lastUpdate: 0});
                setTimeout(this.fetchData, 1000)
            });
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
            <div key={index} className={`d-flex justify-content-between py-1`}>
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

    renderDHT() {
        //const {timestamp, temperature, humidity} = JSON.parse(get(this.state, 'status.dht', {}));
        let dht = get(this.state, 'status.dht', {});
        try {
            dht = JSON.parse(dht);
        } catch (err) {
            // fail silently
        }
        const {timestamp, temperature, humidity} = dht;
        const now = moment();
        const then = moment(timestamp);
        const delta = moment(now.diff(then));
        const deltaDisplay = delta.get('hour') > 1
            ? "over an hour ago"
            : delta.get('minute') < 1 ? "less than a minute ago"
            : `${delta.get('minute')} minutes ago`
        const celToF = (c) => (c * 9/5) + 32;

        return (
            <div className="mb-4">
                <i>updated {deltaDisplay}</i>
                <h2>{Math.floor(celToF(temperature))}&deg;F / {humidity}%</h2>
            </div>
        );
    }

    render() {
        const items = this.state.data
            .map((value, index) => this.renderEntry(value, index));
        const display = items.length ? items : <i>No trains detected.</i>
        return (
            <div className="my-5">
                {this.renderDHT()}
                <div className="d-flex align-items-center justify-content-between">
                    <div className="title">Midnight Train</div>
                    <div>{this.renderStatus()}</div>
                </div>
                {display}
            </div>
        );
    }
}
 
export default MidnightTrain;