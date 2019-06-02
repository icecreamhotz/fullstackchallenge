import { UPDATE_COST, UPDATE_MONEY, DELETE_MONEY } from "../../types";

export default function cost(state = { cost: {}, money: 0 }, action = {}) {
  switch (action.type) {
    case UPDATE_COST:
      return Object.assign({}, state, {
        cost: action.payload.cost
      });
    case UPDATE_MONEY:
      return Object.assign({}, state, {
        money: action.payload.money
      });
    case DELETE_MONEY:
      return Object.assign({}, state, {
        money: 0
      });
    default:
      return state;
  }
}
