import Axios from 'axios';
import { Dispatch } from 'redux';

import Action from '../../utils/action';
import ActionTypes from '../../utils/types';

import {productType} from '../reducers/productReducer';

const axios = Axios.create({
    baseURL:"https://spring-sampleapp.herokuapp.com",
});

export const setProductLoading = (state:boolean) => (dispatch:Dispatch<Action>) => {
    return dispatch({type:ActionTypes.PRODUCTS_LOADING, payload:state});
}

export const getProductsFromShowcase = () => (dispatch:Dispatch<Action>) => {
    dispatch({type:ActionTypes.PRODUCTS_LOADING, payload:true});
    axios.get("api/products/showcase").then(response => {
        
        const data = response.data;

        if(data.result){
            const products:productType[] = data.products;
            
            dispatch({type:ActionTypes.PRODUCTS_SET, payload:products});
        }

        dispatch({type:ActionTypes.PRODUCTS_LOADING, payload:true});
    }).catch(error=>{
        console.log(error.response);
        dispatch({type:ActionTypes.PRODUCTS_LOADING, payload:true});
    });
}

export const getProductsFromCategory = (categoryName:string, index:number) => (dispatch:Dispatch<Action>) =>{
    dispatch({type:ActionTypes.PRODUCTS_LOADING, payload:true});
    axios.get("api/products/category",{
        params:{
            name:categoryName,
            index:index
        }
    }).then(response => {
        
        const data = response.data;

        if(data.result){
            const products:productType[] = data.products;
            
            dispatch({type:ActionTypes.PRODUCTS_SET, payload:products});
        }

        dispatch({type:ActionTypes.PRODUCTS_LOADING, payload:true});
    }).catch(error=>{
        console.log(error.response);
        dispatch({type:ActionTypes.PRODUCTS_LOADING, payload:true});
    });
}