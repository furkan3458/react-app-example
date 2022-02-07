import action from '../../utils/action';
import ActionTypes from '../../utils/types';

export interface CartState {
    isInitializeCart: boolean;
    isCartLoading: boolean;
    productCount: number;
    cartProducts: CartProductType[];
}

export interface CartProductType {
    id: number;
    name: string;
    secondtext:string;
    price: number;
    amount: number;
    image: string;
}

const initialState: CartState = {
    isCartLoading: false,
    isInitializeCart: false,
    productCount: 0,
    cartProducts: []
};

const CartReducer = (state: CartState = initialState, action: action) => {
    switch (action.type) {
        case ActionTypes.CART_INITIALIZE:
            return {
                ...state,
                isInitializeCart: action.payload
            }
        case ActionTypes.CART_LOADING:
            return {
                ...state,
                isCartLoading: action.payload
            };
        case ActionTypes.CART_SET:
            return {
                ...state,
                isCartLoading: false,
                productCount: action.payload.length,
                cartProducts: action.payload
            }
        case ActionTypes.CART_ADD: {
            let tempProducts: CartProductType[] = state.cartProducts;
            tempProducts.push(action.payload);
            return {
                ...state,
                isCartLoading: false,
                productCount: state.productCount + 1,
                cartProducts: tempProducts
            }
        }
        case ActionTypes.CART_UPDATE:{
            let tempProducts: CartProductType[] = state.cartProducts;
            let updateItem:CartProductType = action.payload.item;
            let updateIndex:number = action.payload.index;

            tempProducts[updateIndex] = updateItem;
            return{
                ...state,
                isCartLoading: false,
                cartProducts: tempProducts,
            }
        }
        case ActionTypes.CART_REMOVE:{
            let tempProducts: CartProductType[] = state.cartProducts;
            let removeIndex:number = action.payload;

            tempProducts.splice(removeIndex,1);

            return{
                ...state,
                isCartLoading: false,
                productCount: state.productCount - 1,
                cartProducts: tempProducts
            }
        }
        default:
            return state;
    }
};

export default CartReducer;
