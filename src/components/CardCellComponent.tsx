import React, { useRef, useState, useContext } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CldImageComponent from './CldImageComponent';

import ProductMenuContext, { ProductMenuContextProvider } from '../contexts/ProductMenuContext';

interface CardCellPropType {
  id: number,
  to: string,
  title: string,
  price: number,
  image: string,
  oldPrice?: number,
  tag?: string,
  discount?: string
}

const CardCellComponent = ({ ...props }: CardCellPropType) => {

  const context = useContext(ProductMenuContext);
  //const navClone = useRef<HTMLUListElement>(null);

  const onShoppingChartClick = (id: number) => {
    console.log("onShoppingChart", id);
    context.addCart!(id);
  }

  const onFavoritesClick = (id: number) => {
    console.log("onFavorites", id);
    context.addFavorites!(id);
  }

  const onFullScreenClick = (id: number) => {
    console.log("Fullscreen", id);
    context.fullscreen!(id,props.image);
  }

  return (
    <Col md={6} lg={4} xl={3}>
      <div id={"product_" + props.id} className="single-product">
        <div className="part-1">
          {props.discount ? <span className="discount">{props.discount}% off</span> : <></>}
          {props.tag ? <span className="new">{props.tag}</span> : <></>}
          <Link to={props.to}>
            <div className="img">
              <CldImageComponent folder={"samples/ecommerce"} name={props.image} />
            </div>
          </Link>
          <ul className="menu">
            <li><span onClick={() => onShoppingChartClick(props.id)}><i className="fas fa-shopping-cart"></i></span></li>
            <li><span onClick={() => onFavoritesClick(props.id)}><i className="fas fa-heart"></i></span></li>
            <li><span ><i className="fas fa-plus"></i></span></li>
            <li><span onClick={() => onFullScreenClick(props.id)}><i className="fas fa-expand"></i></span></li>
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
