import { UPDATE_COST, UPDATE_MONEY, DELETE_MONEY } from "../../types";

export const setCost = cost => dispatch => {
  dispatch({
    type: UPDATE_COST,
    payload: {
      cost: {
        _id: "5ceea163de8adf2ef81d502b",
        locker: 1,
        size: {
          _id: "5cee905b5162c31b700a185a",
          size: "S"
        },
        income: 700,
        status: "1",
        timeout: "2019-06-02T18:49:29.166",
        user: {
          _id: "5cf016743caf73157c995336",
          telephone: "0850300073"
        }
      }
    }
  });
};

export const setMoney = money => dispatch => {
  dispatch({
    type: UPDATE_MONEY,
    payload: { money: money }
  });
};

export const deleteMoney = money => dispatch => {
  dispatch({
    type: DELETE_MONEY,
    payload: { money: 0 }
  });
};
