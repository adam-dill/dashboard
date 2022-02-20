import { fetchData } from "./baseAction";

export const FETCH_CALENDAR_BEGIN = "FETCH_CALENDAR_BEGIN";
export const FETCH_CALENDAR_SUCCESS = "FETCH_CALENDAR_SUCCESS";
export const FETCH_CALENDAR_FAILURE = "FETCH_CALENDAR_FAILURE";

export const fetchCalendarBegin = () => ({
    type: FETCH_CALENDAR_BEGIN,
});

export const fetchCalendarSuccess = (data) => ({
    type: FETCH_CALENDAR_SUCCESS,
    lastUpdate: new Date(),
    data,
});

export const fetchCalendarFailure = (error) => ({
    type: FETCH_CALENDAR_FAILURE,
    error,
});

export function fetchCalendar() {
    return fetchData('/calendar', fetchCalendarBegin, fetchCalendarSuccess, fetchCalendarFailure);
}
