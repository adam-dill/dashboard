import { combineReducers } from "redux";
import timeReducer from "./timeReducer";

export default combineReducers({
    clock: timeReducer,
});
