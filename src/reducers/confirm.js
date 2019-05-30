import { UPDATE_CONFIRM_LOCKER } from "../types";

export default function locker(state = {}, action = {}) {
  switch (action.type) {
    case UPDATE_CONFIRM_LOCKER:
      return action.confirmLocker;
    default:
      return state;
  }
}
