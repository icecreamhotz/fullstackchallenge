import { UPDATE_COST, UPDATE_MONEY, DELETE_MONEY } from "../types";

export const setCost = cost => dispatch => {
  dispatch({
    type: UPDATE_COST,
    cost
  });
};

export const setMoney = money => dispatch => {
  dispatch({
    type: UPDATE_MONEY,
    money
  });
};

export const deleteMoney = money => dispatch => {
  dispatch({
    type: DELETE_MONEY,
    money
  });
};
