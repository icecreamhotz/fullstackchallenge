import {
  UPDATE_MODAL_SUCCESS,
  UPDATE_MODAL_UNAVAILABLE,
  UPDATE_CHANGE_SUCCESS
} from "../types";

export default function modal(
  state = { successModal: false, unAvailableModal: false, change: 0 },
  action = {}
) {
  switch (action.type) {
    case UPDATE_MODAL_SUCCESS:
      return { ...state, successModal: action.status };
    case UPDATE_MODAL_UNAVAILABLE:
      return { ...state, unAvailableModal: action.status };
    case UPDATE_CHANGE_SUCCESS:
      return { ...state, change: action.change };
    default:
      return state;
  }
}
