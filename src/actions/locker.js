import { UPDATE_LOCKER_SELECTED } from "../types";

export const setLockers = lockers => dispatch => {
  dispatch({
    type: UPDATE_LOCKER_SELECTED,
    lockers
  });
};
