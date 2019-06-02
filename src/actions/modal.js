import {
  UPDATE_MODAL_SUCCESS,
  UPDATE_MODAL_UNAVAILABLE,
  UPDATE_CHANGE_SUCCESS
} from "../types";

export const setStatusSuccessModal = status => dispatch => {
  dispatch({
    type: UPDATE_MODAL_SUCCESS,
    status
  });
};

export const setStatusUnAvailableModal = status => dispatch => {
  dispatch({
    type: UPDATE_MODAL_UNAVAILABLE,
    status
  });
};

export const setChangeToSuccessModal = change => dispatch => {
  dispatch({
    type: UPDATE_CHANGE_SUCCESS,
    change
  });
};
