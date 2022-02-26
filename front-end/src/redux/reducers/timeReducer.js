import { UPDATE_TIME } from "../actions/timeAction";
import { days, months } from "../../constants";

const timeOptions = {
    hour: 'numeric',
    minute: '2-digit', 
    hour12: true
}
const getData = (data) => {
    const est = new Date(new Date(data).setHours(data.getHours() + 1)).toLocaleTimeString([], timeOptions).split(' ')[0];
    const cst = new Date(data).toLocaleTimeString([], timeOptions).split(' ')[0];
    const pst = new Date(new Date(data).setHours(data.getHours() - 2)).toLocaleTimeString([], timeOptions).split(' ')[0];

    const month = months[data.getMonth()];
    const day = days[data.getDay()];
    const date = data.getDate();
    return {
        est,
        cst,
        pst,
        month,
        day,
        date
    }
}
const initialState = getData(new Date());

const timeReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TIME:
            return {
                ...state,
                ...getData(action.data)
            };
        default:
            return state;
    }
};

export default timeReducer;