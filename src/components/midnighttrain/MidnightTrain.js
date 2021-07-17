import React from 'react';
import moment from 'moment';
import get from 'lodash-es/get';

const UPDATE_DELAY = 1;
const TOLERANCE = 5;
class MidnightTrain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            status: {},
            lastUpdateDisplay: undefined
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        this.updateStatus();
        this.updateLastUpdate();
        setInterval(() => {
            this.fetchData();
            this.updateStatus();
        }, 60000 * 10);
        setInterval(() => {
            this.updateLastUpdate();
        }, 60000);
    }

    updateStatus() {
        fetch('http://midnighttrain.adamdill.com/status/')
            .then(response => response.json())
            .then(result => {
                const {data} = result;
                if (data) {
                    const newStatus = {};
                    data.forEach(item => newStatus[item.key] = item.value);
                    this.setState({status: newStatus});
                }
            })
            .catch(e => setTimeout(this.updateStatus.bind(this), 10000));
    }

    fetchData() {
        fetch(`http://midnighttrain.adamdill.com/entries/today`)
            .then(response => response.json())
            .then(result => {
                const yesterday = moment().subtract(1, 'd');
                const entries = result.data
                    .map(value => this.processEntry(value));
                this.setState({data: entries});
            })
            .catch(e => {
                this.setState({lastUpdate: 0});
                setTimeout(this.fetchData, 10000)
            });
    }

    processEntry(entry) {
        let date = moment(entry.time);
        if (date.isDST() === false) { date.add(1, "h"); }
        const day = date.format("ddd, MMMM Do");
        const time = date.format("h:mm a");
        return {
            date,
            day,
            time,
            rawTime: entry.time,
            duration: ((entry.duration/1000)/60),
            rawDuration: entry.duration,
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
        let dht = get(this.state, 'status.dht', {});
        try {
            dht = JSON.parse(dht);
        } catch (err) {
            // fail silently
        }
        const {temperature, humidity} = dht;
        const celToF = (c) => (c * 9/5) + 32;
        const display = this.state.lastUpdateDisplay
            ? (<i>updated {this.state.lastUpdateDisplay} ago</i>)
            : (<i className="text-warning">sensor appears down</i>);
        const style = this.state.lastUpdateDisplay
            ? ''
            : 'opacity-5'
        return (
            <div className="mb-4">
                {display}
                <h2 className={style}>{Math.floor(celToF(temperature))}&deg;F / {humidity}%</h2>
            </div>
        );
    }

    updateLastUpdate() {
        const lastUpdateDisplay = this.getDisplayString();
        this.setState({lastUpdateDisplay})
    }

    getDisplayString(dht) {
        if (!dht) {
            dht = get(this.state, 'status.dht', {});
            try {
                dht = JSON.parse(dht);
            } catch (err) {/* fail silently*/}
        }
        const {timestamp} = dht;
        const now = moment();
        const then = moment(timestamp);

        const duration = moment.duration(now.diff(then));
        const hours = parseInt(duration.asHours());
        const minutes = parseInt(duration.asMinutes())%60;
        
        return hours >= 2
            ? undefined
            : hours >= 1 ? "over an hour"
            : minutes < 1 ? "less than a minute"
            : `${minutes} minutes`
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