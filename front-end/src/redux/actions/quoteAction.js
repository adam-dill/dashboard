import { fetchData } from "./baseAction";

export const FETCH_QUOTE_BEGIN = "FETCH_QUOTE_BEGIN";
export const FETCH_QUOTE_SUCCESS = "FETCH_QUOTE_SUCCESS";
export const FETCH_QUOTE_FAILURE = "FETCH_QUOTE_FAILURE";

export function fetchQuote() {
    return fetchData('/quote', fetchQuote, FETCH_QUOTE_BEGIN, FETCH_QUOTE_SUCCESS, FETCH_QUOTE_FAILURE);
}
