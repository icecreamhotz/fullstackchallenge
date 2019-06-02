import { combineReducers } from "redux";

import locker from "./reducers/locker";
import cost from "./reducers/cost";
import modal from "./reducers/modal";

export default combineReducers({
  locker,
  cost,
  modal
});
