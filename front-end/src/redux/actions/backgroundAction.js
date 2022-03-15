import { fetchData } from "./baseAction";

export const FETCH_BACKGROUND_BEGIN = "FETCH_BACKGROUND_BEGIN";
export const FETCH_BACKGROUND_SUCCESS = "FETCH_BACKGROUND_SUCCESS";
export const FETCH_BACKGROUND_FAILURE = "FETCH_BACKGROUND_FAILURE";

export const UPDATE_PRIMARY_COLOR = "UPDATE_PRIMARY_COLOR";

export function fetchBackground() {
    return fetchData('/background', fetchBackground, FETCH_BACKGROUND_BEGIN, FETCH_BACKGROUND_SUCCESS, FETCH_BACKGROUND_FAILURE);
}

export function updateColor(color) {
    return (dispatch) => {
        dispatch({type: UPDATE_PRIMARY_COLOR, color});
    };
}
