import { UPDATE_COST, UPDATE_MONEY, DELETE_MONEY } from "../types";

export default function cost(state = { cost: {}, money: 0 }, action = {}) {
  switch (action.type) {
    case UPDATE_COST:
      return { ...state, cost: action.cost };
    case UPDATE_MONEY:
      return {
        ...state,
        money: action.money + state.money
      };
    case DELETE_MONEY:
      return {
        ...state,
        money: 0
      };
    default:
      return state;
  }
}
