import {
    FETCH_CALENDAR_BEGIN,
    FETCH_CALENDAR_SUCCESS,
    FETCH_CALENDAR_FAILURE
} from "../actions/calendarAction";
import { formatLastUpdate } from "./rootReducer";

const initialState = {
    lastUpdate: null,
    loading: false,
    error: null,
    dates: []
};

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CALENDAR_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_CALENDAR_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
                ...state,
                loading: false,
                lastUpdate: formatLastUpdate(action.lastUpdate),
                dates: action.data.response.holidays
                    .map(item => {
                        return {
                            "name": item.name,
                            "date": item.date.iso
                        }
                    })
                    .filter(item => {
                        const now = new Date();
                        const end = new Date();
                        end.setDate(now.getDate() + 7);
                        const target = new Date(item.date);
                        return target.getTime() >= now.getTime() && target.getTime() <= end.getTime();
                    })
                    .filter((item, index, arr) => {
                        // check if there is another of these further in the list
                        const duplicates = arr.find((v, i) => {
                            return i > index && v.name === item.name;
                        });
                        return !duplicates;
                    })
            };

        case FETCH_CALENDAR_FAILURE:
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
export default calendarReducer;