import React from 'react';
import get from 'lodash-es/get';
import last from 'lodash-es/last';
import moment from 'moment';

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
        fetch(`https://calendarific.com/api/v2/holidays?&api_key=${this.props.api}&country=US&year=${year}`)
            .then(response => response.json())
            .then(data => {
                const dates = get(data, 'response.holidays', [])
                    .map(value => {
                        return {
                            date: get(value, 'date.iso'),
                            label: get(value, 'name', 'N/A').trim()
                        }
                    })
                    .filter((value, index, arr) => {
                        let indicies = [];
                        arr.forEach((test, index) => {
                            if (value.date === test.date && value.label === test.label) {
                                indicies.push(index);
                            }
                        });
                        return index === indicies[0] ? true : false;
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
        if (!this.dates) {
            return [];
        }
        const displayed = this.dates
            .filter(value => {
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
        const date = moment(get(group, '0.date'));
        const dateDisplay = 
              date.isSame(moment(), 'day') ? 'TODAY'
            : date.isSame(moment().add(1, 'd'), 'day') ? 'TOMORROW'
            : date.format('ddd, MMM Do');
        return (
            <div key={`group-${index}`} className="mb-3 breaker">
                <div className="title">{dateDisplay}</div>
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