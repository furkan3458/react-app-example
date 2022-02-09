import React from "react";

import empty from "../utils/empty";

export interface ProductMenuContextProvider{
    fullscreen:Function;
    addCart:Function;
    addFavorites:Function;
}

const initialize:ProductMenuContextProvider = {
    fullscreen:empty,
    addCart:empty,
    addFavorites:empty,
}

const ProductMenuContext = React.createContext(initialize);

export default ProductMenuContext;