import React from "react";

import empty from "../utils/empty";

export interface AmountContextProdiver{
    increase:Function;
    decrease:Function;
    remove:Function;
}

const initialize:AmountContextProdiver = {
    increase:empty,
    decrease:empty,
    remove:empty,
}

const ShoppingCartAmountContext = React.createContext(initialize);

export default ShoppingCartAmountContext;