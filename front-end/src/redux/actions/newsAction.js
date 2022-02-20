import { fetchData } from "./baseAction";

export const FETCH_NEWS_BEGIN = "FETCH_NEWS_BEGIN";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";

export const fetchNewsBegin = () => ({
    type: FETCH_NEWS_BEGIN,
});

export const fetchNewsSuccess = (data) => ({
    type: FETCH_NEWS_SUCCESS,
    lastUpdate: new Date(),
    data,
});

export const fetchNewsFailure = (error) => ({
    type: FETCH_NEWS_FAILURE,
    error,
});

export function fetchNews() {
    return fetchData('/news', fetchNewsBegin, fetchNewsSuccess, fetchNewsFailure);
}
