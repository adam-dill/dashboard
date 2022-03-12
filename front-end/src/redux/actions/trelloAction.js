import { fetchData } from "./baseAction";

export const FETCH_TRELLO_BEGIN = "FETCH_TRELLO_BEGIN";
export const FETCH_TRELLO_SUCCESS = "FETCH_TRELLO_SUCCESS";
export const FETCH_TRELLO_FAILURE = "FETCH_TRELLO_FAILURE";

export function fetchTrello() {
    return fetchData('/trello', FETCH_TRELLO_BEGIN, FETCH_TRELLO_SUCCESS, FETCH_TRELLO_FAILURE);
}
