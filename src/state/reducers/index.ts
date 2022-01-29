import { combineReducers } from "redux";

import authReducer from "./authReducer";

const reducers = combineReducers({
    auth:authReducer
});

export default reducers;

export type StateType = ReturnType<typeof reducers>;