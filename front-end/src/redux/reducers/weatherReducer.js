import {
    FETCH_WEATHER_BEGIN,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE
} from "../actions/weatherAction";
import { days } from "../../constants";
import { formatLastUpdate } from "./rootReducer";

const initialState = {
    lastUpdate: null,
    loading: false,
    error: null,
    forcast: []
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WEATHER_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_WEATHER_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            const forcast = action.data.daily
                .filter((value, index) => index < 5)
                .map(value => {
                    const ts = parseInt(value.dt);
                    const date = new Date(ts * 1000);
                    const day = days[date.getDay()];
                    return {
                        day,
                        temp: Math.round(value.temp.day),
                        max: Math.round(value.temp.max),
                        min: Math.round(value.temp.min),
                        label: value.weather[0].main,
                        icon: value.weather[0].icon
                    }
                })
            return {
                ...state,
                loading: false,
                lastUpdate: formatLastUpdate(action.lastUpdate),
                forcast
            };

        case FETCH_WEATHER_FAILURE:
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
export default weatherReducer;