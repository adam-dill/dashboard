const url = "http://localhost:5000/api/v1";

export function fetchData(endpoint, beginFn, successFn, failureFn) {
    return (dispatch) => {
        dispatch(beginFn());
        return fetch(`${url}${endpoint}`)
            .then(handleErrors)
            .then((res) => res.json())
            .then((data) => {
                dispatch(successFn(data));
                return data;
            })
            .catch((error) => dispatch(failureFn({
                title: `${endpoint}`,
                message: error.message
            })));
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}