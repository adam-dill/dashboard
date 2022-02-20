import { fetchData } from "./baseAction";

export const FETCH_TRENDS_BEGIN = "FETCH_TRENDS_BEGIN";
export const FETCH_TRENDS_SUCCESS = "FETCH_TRENDS_SUCCESS";
export const FETCH_TRENDS_FAILURE = "FETCH_TRENDS_FAILURE";

export const fetchTrendsBegin = () => ({
    type: FETCH_TRENDS_BEGIN,
});

export const fetchTrendsSuccess = (data) => ({
    type: FETCH_TRENDS_SUCCESS,
    lastUpdate: new Date(),
    data,
});

export const fetchTrendsFailure = (error) => ({
    type: FETCH_TRENDS_FAILURE,
    error,
});

export function fetchTrends() {
    return fetchData('/trends', fetchTrendsBegin, fetchTrendsSuccess, fetchTrendsFailure);
}
