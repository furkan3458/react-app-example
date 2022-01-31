import Axios from 'axios';
import { Dispatch } from 'redux';

import Action from '../../utils/action';
import ActionTypes from '../../utils/types';

const axios = Axios.create({
    baseURL:"https://spring-sampleapp.herokuapp.com",
});

export const setLoading = (state:boolean) => (dispatch:Dispatch<Action>) => {
    return dispatch({type:ActionTypes.AUTH_LOADING, payload:state});
}

export const setAuthenticated = (state:boolean) => (dispatch:Dispatch<Action>) => {
    dispatch({type:ActionTypes.AUTH_AUTHENTICATION, payload:state});
}

export const setAuthFail = (state:boolean) => (dispatch:Dispatch<Action>) => {
    dispatch({type:ActionTypes.AUTH_FAIL, payload:state});
}

export const setUser = (user:any) => (dispatch:Dispatch<Action>) => {
    dispatch({type:ActionTypes.AUTH_SET_USER, payload:user});
}

export const loadUser = (user:any) => (dispatch:Dispatch<Action>) => {
    dispatch({type:ActionTypes.AUTH_LOADING, payload:true});
    axios.post("api/auth/signin",user).then(response => {
        const data = response.data;
        console.log(data);
        dispatch({type:ActionTypes.AUTH_LOADING, payload:false});
        
        if(data.error === undefined || data.error === null){

            localStorage.setItem("remember-me",user.rememberMe);
            localStorage.setItem("jwtKey",data.token);
            localStorage.setItem("session",btoa(unescape(encodeURIComponent(JSON.stringify(data)))) );
            
            dispatch({type:ActionTypes.AUTH_SET_USER, payload:user});
        }
        else{
            dispatch({type:ActionTypes.AUTH_FAIL, payload:true});
        } 
    })
    .catch(error=>{
        console.log(error);
        dispatch({type:ActionTypes.AUTH_LOADING, payload:false});
        dispatch({type:ActionTypes.AUTH_FAIL, payload:true});
    });
}

export const validateUser = () => (dispatch:Dispatch<Action>) => {
    let userStore = localStorage.getItem("session")! ? localStorage.getItem("session")! : "";
    let userStr = decodeURIComponent(escape(window.atob(userStore)));
    const user = userStr !== "" ? JSON.parse(userStr) : null;

    if(user){
        const validate:any = {
            username:user.username,
            token:user.token,
        }

        axios.post("api/auth/validate",validate).then(response=>{
            const data = response.data;
            if(data.validate){
                dispatch({type:ActionTypes.AUTH_VALIDATE, payload:user});
            }
            else{
                clearStorage();
                dispatch({type:ActionTypes.AUTH_VALIDATE, payload:null});
            }
        }).catch(error=>{
            console.log(error);
            clearStorage();
            dispatch({type:ActionTypes.AUTH_VALIDATE, payload:null});
        });
    }
    else{
        dispatch({type:ActionTypes.AUTH_VALIDATE, payload:null});
    }
}

const clearStorage = () =>{
    localStorage.removeItem("jwtKey");
    localStorage.removeItem("session");
    localStorage.removeItem("remember-me");
} 

