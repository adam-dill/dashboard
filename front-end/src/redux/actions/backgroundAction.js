import { fetchData } from "./baseAction";

export const FETCH_BACKGROUND_BEGIN = "FETCH_BACKGROUND_BEGIN";
export const FETCH_BACKGROUND_SUCCESS = "FETCH_BACKGROUND_SUCCESS";
export const FETCH_BACKGROUND_FAILURE = "FETCH_BACKGROUND_FAILURE";

export const fetchBackgroundBegin = () => ({
    type: FETCH_BACKGROUND_BEGIN,
});

export const fetchBackgroundSuccess = (data) => ({
    type: FETCH_BACKGROUND_SUCCESS,
    lastUpdate: new Date(),
    data,
});

export const fetchBackgroundFailure = (error) => ({
    type: FETCH_BACKGROUND_FAILURE,
    error,
});

export function fetchBackground() {
    return fetchData('/background', fetchBackgroundBegin, fetchBackgroundSuccess, fetchBackgroundFailure);
}
