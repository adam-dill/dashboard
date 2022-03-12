import { fetchData } from "./baseAction";

export const FETCH_NEWS_BEGIN = "FETCH_NEWS_BEGIN";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";

export function fetchNews() {
    return fetchData('/news', FETCH_NEWS_BEGIN, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE);
}
