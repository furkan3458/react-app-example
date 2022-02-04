import { combineReducers } from "redux";

import authReducer from "./authReducer";
import productReducer from "./productReducer";

const reducers = combineReducers({
    auth:authReducer,
    products:productReducer,
});

export default reducers;

export type StateType = ReturnType<typeof reducers>;