import React from 'react';

class MiniCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        this.setState({
            tasks: [
                {time: '8:00 AM', label: 'Dentist Appointment'},
                {time: '11:15 PM', label: 'Daily Standup'},
                {time: '2:00 PM', label: 'Payday'},
            ]
        })
    }

    render() { 
        const items = this.state.tasks
            .map((value, index) => {
                return (
                    <div key={index} className="d-flex border-bottom py-2 justify-content-between">
                        <div className="pr-2">{value.label}</div>
                        <div className="text-nowrap">{value.time}</div>
                    </div>
                );
            });
        return (
            <>
                <div className="title">{this.props.title}</div>
                {items}
            </>
        );
    }
}
 
export default MiniCalendar;