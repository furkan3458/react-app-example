import { combineReducers } from "redux";

import authReducer, { authState } from "./authReducer";
import productReducer, { productState } from "./productReducer";
import cartReducer, { CartState } from './cartReducer';
import { useSelector,TypedUseSelectorHook } from "react-redux";

const reducers = combineReducers({
    auth:authReducer,
    products:productReducer,
    cart:cartReducer,
});

interface RootState{
    auth:authState;
    cart:CartState;
    products:productState;
}

export default reducers;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type StateType = ReturnType<typeof reducers>;