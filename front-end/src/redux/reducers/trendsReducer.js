import {
    FETCH_TRENDS_BEGIN,
    FETCH_TRENDS_SUCCESS,
    FETCH_TRENDS_FAILURE
} from "../actions/trendsAction";
import { formatLastUpdate } from "./rootReducer";

const initialState = {
    lastUpdate: null,
    data: null,
    loading: false,
    error: null
};

const trendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRENDS_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_TRENDS_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            const resultData = JSON.parse(action.data[0].data);
            const tickers = Object.keys(resultData.scores);
            // assume all data is structured consistently.
            const trackingKeys = Object.keys(resultData.scores[tickers[0]]);
            const colorNames = [
                "rgb(255, 0, 255)",
                "rgb(124, 252, 0)",
                "rgb(70, 130, 180)",
            ];
            const datasets = trackingKeys
                .filter(key => key !== 'neu')
                .map((key, index) => {
                    return {
                        label: key,
                        data: tickers.map(ticker => resultData.scores[ticker][key]),
                        backgroundColor: colorNames[index]
                    }
                });
            return {
                ...state,
                loading: false,
                lastUpdate: formatLastUpdate(action.lastUpdate),
                data: { labels: tickers, datasets }
            };

        case FETCH_TRENDS_FAILURE:
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
export default trendsReducer;