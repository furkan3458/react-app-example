import action from '../../utils/action';
import ActionTypes from '../../utils/types';

interface productState{
    isProductLoading:boolean,
    products:productType[],
}

export interface productType{
    id:number,
    name:string,
    price:number,
    discount:number,
    image:string,
    tag:string,
    category:categoryType,
    detail:bookDetailType,
}

interface categoryType{
    id:number,
    name:string,
}

interface bookDetailType{
    author:string,
    subject:string,
    publisher:string,
    relaseDate:string,
}

const initialize = {
    isProductLoading:false,
    products: []
}

const productReducer = (state: productState = initialize, action: action) => {

    switch(action.type){
        case ActionTypes.PRODUCTS_LOADING:
            return {
                ...state,
                isProductLoading:action.payload
            }
        case ActionTypes.PRODUCTS_SET:
            return {
                ...state,
                products:action.payload,
            }
        default:
            return state;
    }
}

export default productReducer;