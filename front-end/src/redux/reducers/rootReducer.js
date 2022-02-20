import { combineReducers } from "redux";
import backgroundReducer from "./backgroundReducer";
import calendarReducer from "./calendarReducer";
import newsReducer from "./newsReducer";
import quoteReducer from "./quoteReducer";
import timeReducer from "./timeReducer";
import trelloReducer from "./trelloReducer";
import trendsReducer from "./trendsReducer";
import weatherReducer from "./weatherReducer";

export default combineReducers({
    background: backgroundReducer,
    clock: timeReducer,
    weather: weatherReducer,
    news: newsReducer,
    quote: quoteReducer,
    calendar: calendarReducer,
    trello: trelloReducer,
    trends: trendsReducer,
});
