import React from 'react';
import get from 'lodash-es/get';
import last from 'lodash-es/last';
import moment from 'moment';

const API_KEY = "e3f0a60dbc2a097d7ef955e3c483db9c4eabcb4c";

class MiniCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: []
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        setInterval(() => {
            this.setState({dates: this.filterDates()});
        }, 5000);
    }

    fetchData() {
        const year = moment().year();
        fetch(`https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=US&year=${year}`)
            .then(response => response.json())
            .then(data => {
                const dates = get(data, 'response.holidays', [])
                    .map(value => {
                        return {
                            date: get(value, 'date.iso'),
                            label: get(value, 'name')
                        }
                    });
                this.dates = dates;
                this.setState({dates: this.filterDates()});

            })
            .catch(e => setTimeout(this.fetchData, 1000));
    }

    groupDates(arr) {
        let returnValue = [];
        let current;
        arr.forEach(value => {
            if (!current || value.date !== current) {
                current = value.date;
                returnValue.push([]);
            }
            last(returnValue).push({
                date: value.date,
                label: value.label
            });
        });
        return returnValue;
    }

    filterDates() {
        const displayed = this.dates.filter(value => {
            const min = moment().subtract(1, 'd');
            const max = moment().add(3, 'd');
            return (moment(value.date).isBetween(min, max));
        });
        return this.groupDates(displayed);
    }

    renderGroup(group, index) {
        if (!group || !group.length) {
            return null;
        }
        return (
            <div key={`group-${index}`} className="mb-3 breaker">
                <div className="title">{moment(get(group, '0.date')).format('ddd, MMM Do')}</div>
                {group.map((value, i) => {
                    return (
                        <div key={`label-${index}-${i}`} className="d-flex py-2 justify-content-between">
                            {value.label}
                        </div>
                    );
                })}
            </div>
        );
    }

    render() { 
        return this.state.dates.map((value, index) => this.renderGroup(value, index))
    }
}
 
export default MiniCalendar;