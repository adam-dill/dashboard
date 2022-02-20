export const UPDATE_TIME = 'UPDATE_TIME';

export const updateTime = () => (dispatch) => {
    dispatch({
        type: UPDATE_TIME,
        data: new Date(),
    });
};
