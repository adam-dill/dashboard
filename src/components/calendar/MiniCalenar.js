import React from 'react';
import get from 'lodash-es/get';
import last from 'lodash-es/last';
import moment from 'moment';

const API_KEY = "e3f0a60dbc2a097d7ef955e3c483db9c4eabcb4c";

class MiniCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            displayed: []
        }
    }

    componentDidMount() {
        this.fetchData();
        setInterval(this.filterDates.bind(this, this.state.dates), 60000);
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
                this.filterDates(dates)
                this.setState({dates});

            })
            .catch(e => setTimeout(this.fetchData.bind(this), 1000));
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

    filterDates(dates) {
        const displayed = dates.filter(value => {
            const max = moment().add(1, 'M');
            return (moment(value.date).isBetween(moment(), max));
        });
        this.setState({displayed: this.groupDates(displayed)});
    }

    renderGroup(group, index) {
        if (!group || !group.length) {
            return null;
        }
        return (
            <div key={`group-${index}`} className="mb-3">
                <div className="title">{moment(get(group, '0.date')).format('ddd, MMM Do')}</div>
                {group.map((value, i) => {
                    return (
                        <div key={`label-${index}-${i}`} className="d-flex border-bottom py-2 justify-content-between">
                            {value.label}
                        </div>
                    );
                })}
            </div>
        );
    }

    render() { 
        return this.state.displayed.map((value, index) => this.renderGroup(value, index));
    }
}
 
export default MiniCalendar;