export const api = "http://localhost:5000/api/v1";

export function fetchData(endpoint, begin, success, failure) {
    return (dispatch) => {
        console.log('fetchData', endpoint, begin, success, failure)
        dispatch({type: begin});
        return fetch(`${api}${endpoint}`)
            .then(handleErrors)
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: success,
                    lastUpdate: new Date(),
                    data
                });
                return data;
            })
            .catch((error) => dispatch({
                type: failure,
                lastUpdate: new Date(),
                error: {
                    title: endpoint,
                    message: error.message
                }
            }));
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}