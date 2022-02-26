import { UPDATE_TIME } from "../actions/timeAction";

const timeOptions = {
    hour: '2-digit',
    minute: '2-digit', 
    hour12: true
}
const getData = (date) => {
    const est = new Date(new Date(date).setHours(date.getHours() + 1)).toLocaleTimeString([], timeOptions).split(' ')[0];
    const cst = new Date(date).toLocaleTimeString([], timeOptions).split(' ')[0];
    const pst = new Date(new Date(date).setHours(date.getHours() - 2)).toLocaleTimeString([], timeOptions).split(' ')[0];

    return {
        est,
        cst,
        pst
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