import { combineReducers } from "redux";
import backgroundReducer from "./backgroundReducer";
import calendarReducer from "./calendarReducer";
import quoteReducer from "./quoteReducer";
import timeReducer from "./timeReducer";
import trelloReducer from "./trelloReducer";
import weatherReducer from "./weatherReducer";

export const formatLastUpdate = (date) => {
    const timeOptions = {
        hour: 'numeric',
        minute: '2-digit', 
        hour12: true
    }
    return new Date(date).toLocaleTimeString([], timeOptions);
};

export default combineReducers({
    background: backgroundReducer,
    clock: timeReducer,
    weather: weatherReducer,
    quote: quoteReducer,
    calendar: calendarReducer,
    trello: trelloReducer,
});
