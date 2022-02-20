import { UPDATE_TIME } from "../types";


const timeReducer = (state = {time: new Date()}, action) => {
    switch (action.type) {
        case UPDATE_TIME:
            return {
                ...state,
                time: action.time
            };
        default:
            return {...state};
    }
};
export default timeReducer;