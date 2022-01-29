import action from '../../utils/action';
import ActionTypes from '../../utils/types';

interface authState {
    isAuthenticated?: boolean | false;
    isLoading?:boolean | false;
    user?: object | null;
}

const authReducer = (state:authState = {isAuthenticated:false, isLoading:false, user:null}, action:action) => {
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
                user:action.payload
            }
        default:
            return state;
    }
}

export default authReducer;