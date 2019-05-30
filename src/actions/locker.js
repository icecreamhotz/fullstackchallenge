import { UPDATE_LOCKER_SELECTED, UPDATE_CONFIRM_LOCKER } from "../types";

export const setLockers = lockers => dispatch => {
  dispatch({
    type: UPDATE_LOCKER_SELECTED,
    lockers
  });
};

export const confirmLocker = (confirmLocker) => dispatch => {
  dispatch({
    type: UPDATE_CONFIRM_LOCKER,
    confirmLocker
  });
};
