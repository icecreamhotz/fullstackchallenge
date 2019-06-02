import { UPDATE_LOCKER_SELECTED } from "../../types";
import lockerService from "../locker";

export const mockLockers = () => dispatch => {
  dispatch({
    type: UPDATE_LOCKER_SELECTED,
    payload: lockerService.getAllLocker()
  });
};
