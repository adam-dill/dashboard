import { fetchData } from "./baseAction";

export const FETCH_QUOTE_BEGIN = "FETCH_QUOTE_BEGIN";
export const FETCH_QUOTE_SUCCESS = "FETCH_QUOTE_SUCCESS";
export const FETCH_QUOTE_FAILURE = "FETCH_QUOTE_FAILURE";

export const fetchQuoteBegin = () => ({
    type: FETCH_QUOTE_BEGIN,
});

export const fetchQuoteSuccess = (data) => ({
    type: FETCH_QUOTE_SUCCESS,
    lastUpdate: new Date(),
    data,
});

export const fetchQuoteFailure = (error) => ({
    type: FETCH_QUOTE_FAILURE,
    error,
});

export function fetchQuote() {
    return fetchData('/quote', fetchQuoteBegin, fetchQuoteSuccess, fetchQuoteFailure);
}
