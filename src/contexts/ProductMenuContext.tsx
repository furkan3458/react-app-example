import React from "react";

export interface ProductMenuContextProvider{
    fullscreen:Function | undefined;
    addCart:Function | undefined;
    addFavorites:Function | undefined;
    toastCallback:Function | undefined;
}

const initialize:ProductMenuContextProvider = {
    fullscreen:undefined,
    addCart:undefined,
    addFavorites:undefined,
    toastCallback:undefined
}

const ProductMenuContext = React.createContext(initialize);

export default ProductMenuContext;