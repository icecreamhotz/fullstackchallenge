import {
  UPDATE_MODAL_SUCCESS,
  UPDATE_MODAL_UNAVAILABLE,
  UPDATE_CHANGE_SUCCESS
} from "../../types";

export default function modal(
  state = { successModal: false, unAvailableModal: false, change: 0 },
  action = {}
) {
  switch (action.type) {
    case UPDATE_MODAL_SUCCESS:
      return Object.assign({}, state, {
        successModal: action.payload.status
      });
    case UPDATE_MODAL_UNAVAILABLE:
      return Object.assign({}, state, {
        unAvailableModal: action.payload.status
      });
    case UPDATE_CHANGE_SUCCESS:
      return Object.assign({}, state, {
        change: action.payload.change
      });
    default:
      return state;
  }
}
