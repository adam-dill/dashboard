import { UPDATE_TIME } from "../actions/timeAction";

const initialState = {
    time: new Date()
};

const timeReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TIME:
            return {
                ...state,
                time: action.data
            };
        default:
            return {...state};
    }
};
export default timeReducer;