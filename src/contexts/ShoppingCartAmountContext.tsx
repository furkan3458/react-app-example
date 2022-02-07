import React from "react";

export interface AmountContextProdiver{
    increase:Function | undefined;
    decrease:Function | undefined;
    remove:Function | undefined;
    toast:Function | undefined;
}

const initialize:AmountContextProdiver = {
    increase:undefined,
    decrease:undefined,
    remove:undefined,
    toast:undefined,
}

const ShoppingCartAmountContext = React.createContext(initialize);

export default ShoppingCartAmountContext;