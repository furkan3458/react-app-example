import Axios from "axios";
import { Dispatch } from 'redux';

import Action from '../../utils/action';
import ActionTypes from '../../utils/types';

import {CartProductType} from '../reducers/cartReducer';

const axios = Axios.create({
    baseURL:"https://spring-sampleapp.herokuapp.com",
});

export const setCartLoading = (state:boolean) => (dispatch:Dispatch<Action>) => {
    return dispatch({type:ActionTypes.CART_LOADING, payload:state});
}

export const setCartInitialize = (state:boolean) => (dispatch:Dispatch<Action>) => {
    return dispatch({type:ActionTypes.CART_INITIALIZE, payload:state});
}

export const setShoppingCart = () => (dispatch:Dispatch<Action>) => {
    const chart = JSON.parse(localStorage.getItem("chart")!);
    const chartCount = parseInt(localStorage.getItem("chart-count")!);

    if(chart !== undefined && chart !== null){
        //axios.post("api/chart/validateChart").then(response => {}).catch(error => {console.log(error.response)});
        dispatch({type:ActionTypes.CART_SET, payload:chart});
    }
    else{
        localStorage.setItem("chart", JSON.stringify([]));
        localStorage.setItem("chart-count",Number(0).toString());
    }

    dispatch({type:ActionTypes.CART_INITIALIZE, payload:true});
}

export const setShoppingCartAdd = (item:CartProductType) =>(dispatch:Dispatch<Action>) => {
    dispatch({type:ActionTypes.CART_LOADING, payload:true});

    axios.post("api/chart/checkProduct",item).then(response=> {
        dispatch({type:ActionTypes.CART_ADD, payload:item});
    }).catch(error=> {
        //console.log(error.response);
        //dispatch({type:ActionTypes.CART_LOADING, payload:false});
        dispatch({type:ActionTypes.CART_ADD, payload:item});
    });
    
}

export const setShoppingCartUpdate = (item:CartProductType, index:number) =>(dispatch:Dispatch<Action>) => {
    dispatch({type:ActionTypes.CART_LOADING, payload:true});
    axios.post("api/chart/checkProduct",item).then(response=> {
        dispatch({type:ActionTypes.CART_UPDATE, payload:{item:item, index:index}});
    }).catch(error=> {
        //console.log(error.response);
        //dispatch({type:ActionTypes.CART_LOADING, payload:false});
        dispatch({type:ActionTypes.CART_UPDATE, payload:{item:item, index:index}});
    });
}

export const setShoppingCartRemove = (item:CartProductType, index:number) =>(dispatch:Dispatch<Action>) => {
    dispatch({type:ActionTypes.CART_LOADING, payload:true});
    axios.post("api/chart/checkProduct",item).then(response=> {
        dispatch({type:ActionTypes.CART_REMOVE, payload:index});
    }).catch(error=> {
        //console.log(error.response);
        //dispatch({type:ActionTypes.CART_LOADING, payload:false});
        dispatch({type:ActionTypes.CART_REMOVE, payload:index});
    });
}