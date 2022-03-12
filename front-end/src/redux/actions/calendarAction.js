import { fetchData } from "./baseAction";

export const FETCH_CALENDAR_BEGIN = "FETCH_CALENDAR_BEGIN";
export const FETCH_CALENDAR_SUCCESS = "FETCH_CALENDAR_SUCCESS";
export const FETCH_CALENDAR_FAILURE = "FETCH_CALENDAR_FAILURE";

export function fetchCalendar() {
    return fetchData('/calendar', FETCH_CALENDAR_BEGIN, FETCH_CALENDAR_SUCCESS, FETCH_CALENDAR_FAILURE);
}
