import { UPDATE_TIME } from "../types";

export const updateTimeAction = () => (dispatch) => {
    dispatch({
        type: UPDATE_TIME,
        time: new Date(),
    });
};
