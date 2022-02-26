import {
    FETCH_NEWS_BEGIN,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE
} from "../actions/newsAction";

const initialState = {
    lastUpdate: null,
    loading: false,
    error: null,
    articles: []
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_NEWS_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
                ...state,
                loading: false,
                lastUpdate: action.lastUpdate,
                articles: action.data.articles
                    .map(value => {
                        const index = value.title.lastIndexOf(' - ');
                        const title = value.title.substring(0, index);
                        return {
                            title,
                            source: value.source.name
                        }
                    })
            };

        case FETCH_NEWS_FAILURE:
            // The request failed. It's done. So set loading to "false".
            // Save the error, so we can display it somewhere.
            // Since it failed, we don't have items to display anymore, so set `items` empty.
            //
            // This is all up to you and your app though:
            // maybe you want to keep the items around!
            // Do whatever seems right for your use case.
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}
export default newsReducer;