import React from 'react';
import moment from 'moment';

const withTime = (WrappedComponent) => {
    return class extends React.Component {
        interval;
        constructor(props) {
            super(props);
            this.state = {};
            this.updateTime = this.updateTime.bind(this);
        }

        componentDidMount() {
            this.updateTime();
            this.interval = setInterval(this.updateTime, 1000);
        }

        componentWillUnmount() {
            clearInterval(this.interval);
        }

        updateTime() {
            this.setState({now: moment()})
        }

        render() {
            return <WrappedComponent now={this.state.now} {...this.props} />
        }
    }
}

export default withTime;
