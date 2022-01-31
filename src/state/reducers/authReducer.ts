import action from '../../utils/action';
import ActionTypes from '../../utils/types';

interface authState {
    isAuthenticated?: boolean | false;
    isLoading?:boolean | false;
    isAuthFail?:boolean | false;
    isValidate?:boolean | false;
    user?: object | null;
}

const authReducer = (state:authState = {isAuthenticated:false, isAuthFail:false, isLoading:false, isValidate:false, user:null}, action:action) => {
    switch(action.type){
        case ActionTypes.AUTH_LOADING:
            return {
                ...state,
                isLoading:action.payload
            }
        case ActionTypes.AUTH_AUTHENTICATION:
            return {
                ...state,
                isAuthenticated:action.payload
            }
        case ActionTypes.AUTH_SET_USER:
            return {
                ...state,
                user:action.payload,
                isAuthFail:false,
                isAuthenticated:true,
            }
        case ActionTypes.AUTH_FAIL:
            return {
                ...state,
                isAuthFail:action.payload
            }
        case ActionTypes.AUTH_VALIDATE:
            return {
                ...state,
                user:action.payload,
                isValidate:true
            }
        default:
            return state;
    }
}

export default authReducer;