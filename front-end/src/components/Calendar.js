import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { fetchCalendar } from '../redux/actions/calendarAction';

const Calendar = (props) => {
    const { error, loading, lastUpdate, data } = props;
    const date = new Date(lastUpdate);

    useEffect(() => {
        props.dispatch(fetchCalendar());
    }, []);

    return (
        <div>
            <p>Calendar Last Update: {date.toLocaleTimeString()}</p>
            <p className="code">{JSON.stringify(data)}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.calendar.lastUpdate,
    loading: state.calendar.loading,
    error: state.calendar.error,
    data: state.calendar.data,
  });

export default connect(mapStateToProps)(Calendar);