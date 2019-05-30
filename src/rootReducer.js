import { combineReducers } from "redux";

import locker from "./reducers/locker";
import cost from "./reducers/cost";
import confirm from "./reducers/confirm";

export default combineReducers({
  locker,
  cost,
  confirm
});
