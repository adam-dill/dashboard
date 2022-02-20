import { fetchData } from "./baseAction";

export const FETCH_TRELLO_BEGIN = "FETCH_TRELLO_BEGIN";
export const FETCH_TRELLO_SUCCESS = "FETCH_TRELLO_SUCCESS";
export const FETCH_TRELLO_FAILURE = "FETCH_TRELLO_FAILURE";

export const fetchTrelloBegin = () => ({
    type: FETCH_TRELLO_BEGIN,
});

export const fetchTrelloSuccess = (data) => ({
    type: FETCH_TRELLO_SUCCESS,
    lastUpdate: new Date(),
    data,
});

export const fetchTrelloFailure = (error) => ({
    type: FETCH_TRELLO_FAILURE,
    error,
});

export function fetchTrello() {
    return fetchData('/trello', fetchTrelloBegin, fetchTrelloSuccess, fetchTrelloFailure);
}
