import { UPDATE_LOCKER_SELECTED } from "../../types";

export default function locker(state = {}, action = {}) {
  switch (action.type) {
    case UPDATE_LOCKER_SELECTED:
      return Object.assign({}, state, {
        money: action.payload.locker
      });
    default:
      return state;
  }
}
