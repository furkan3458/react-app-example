import { useRef, useContext, useEffect, useState } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useTypedSelector } from '../state/reducers';

import CldImageComponent from './CldImageComponent';

import ProductMenuContext, { ProductMenuContextProvider } from '../contexts/ProductMenuContext';
import ToastContext, { ToastContextProvider } from '../contexts/ToastContext';

import { CartProductType,CartState } from '../state/reducers/cartReducer';

interface CardCellPropType {
  id: number,
  to: string,
  title: string,
  price: number,
  image: string,
  oldPrice?: number,
  tag?: string,
  discount?: string,
}

const CardCellComponent = ({ ...props }: CardCellPropType): JSX.Element => {

  const context = useContext<ProductMenuContextProvider>(ProductMenuContext);
  const toastContext = useContext<ToastContextProvider>(ToastContext);

  const cardRef = useRef<HTMLDivElement>(null);
  const [isAddingCart, setisAddingCart] = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  const cart:CartState = useTypedSelector<CartState>(state => state.cart);

  useEffect(() => {
    if (!cart.isCartLoading && isAddingCart)
      checkItemOnChart();

  }, [cart.isCartLoading]);


  const onShoppingChartClick = () => {
    if (cart.isCartLoading) {
      toastContext.toastInfo("Please wait...");
      return;
    }
    const cartProducts: CartProductType[] = cart.cartProducts;
    const index = cartProducts.findIndex(value => { return value.id === props.id });

    if(index !== -1)
      setAddedCount(cartProducts[index].amount);

    setisAddingCart(true);
    context.addCart!(props.id, cardRef.current);
  }

  const onFavoritesClick = () => {
    console.log("onFavorites", props.id);
    
    context.addFavorites!(props.id);
  }

  const onFullScreenClick = () => {
    context.fullscreen!(props.id, props.image);
  }

  const checkItemOnChart = () => {
    setisAddingCart(false);
    const cartProducts: CartProductType[] = cart.cartProducts;

    const index = cartProducts.findIndex(value => { return value.id === props.id });

    if (index !== -1 && addedCount !== cartProducts[index].amount && cartProducts[index].amount === 1)
      toastContext.toastSuccess("Product has successfully added to your cart.");
    else if(index !== -1 && addedCount !== cartProducts[index].amount)
    toastContext.toastSuccess("Product has successfully updated.");
    else
    toastContext.toastError("The product could not be added to your cart.");
  }

  return (
    <Col md={6} lg={4} xl={3}>
      <div ref={cardRef} id={"product_" + props.id} className="single-product shadow rounded p-1">
        <div className="part-1">
          {props.discount ? <span className="discount">{props.discount}% off</span> : <></>}
          {props.tag ? <span className="new">{props.tag}</span> : <></>}
          <Link to={props.to}>
            <div className="img">
              <CldImageComponent folder={"samples/ecommerce"} name={props.image} />
            </div>
          </Link>
          <ul className="menu">
            <li><span onClick={() => onShoppingChartClick()}>{cart.isCartLoading ? <Spinner animation="grow" size="sm" /> : <i className="fas fa-shopping-cart"></i>}</span></li>
            <li><span onClick={() => onFavoritesClick()}><i className="fas fa-heart"></i></span></li>
            <li><span ><i className="fas fa-plus"></i></span></li>
            <li><span onClick={() => onFullScreenClick()}><i className="fas fa-expand"></i></span></li>
          </ul>
        </div>
        <div className="part-2">
          <h3 className="product-title">{props.title}</h3>
          {props.oldPrice ? <h4 className="product-old-price">{"$" + props.oldPrice}</h4> : <></>}
          <h4 className="product-price">{"$" + props.price}</h4>
        </div>
      </div>
    </Col>
  );
};

export default CardCellComponent;
