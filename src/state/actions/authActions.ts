import Axios from 'axios';
import { Dispatch } from 'redux';

import Action from '../../utils/action';
import ActionTypes from '../../utils/types';

export const setLoading = (state:boolean) => (dispatch:Dispatch<Action>) => {
    dispatch({type:ActionTypes.AUTH_LOADING, payload:state});
}

export const setAuthenticated = (state:boolean) => (dispatch:Dispatch<Action>) => {
    dispatch({type:ActionTypes.AUTH_AUTHENTICATION, payload:state});
}

export const setUser = (user:object) => (dispatch:Dispatch<Action>) => {
    setLoading(true);
    Axios.post("https://spring-sampleapp.herokuapp.com/api/auth/signin",user).then(response => {
        const data = response.data;
        console.log(data);
        setLoading(false);  
        dispatch({type:ActionTypes.AUTH_SET_USER, payload:user});
    });
}

