import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { StateType } from '../state/reducers';

interface CardPropType{
    header:string,
}

const CardComponent = (props:any) => {

    const products = useSelector((state: StateType) => state.products);

    return (
        <>
            <section className="section-products">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="header">
                                <h3>Featured Product</h3>
                                <h2>Popular Products</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div id="product-1" className="single-product">
                                <Link to="/login" className="part-1">
                                    <div className="img"></div>
                                    <ul>
                                        <li><span><i className="fas fa-shopping-cart"></i></span></li>
                                        <li><span><i className="fas fa-heart"></i></span></li>
                                        <li><span><i className="fas fa-plus"></i></span></li>
                                        <li><span><i className="fas fa-expand"></i></span></li>
                                    </ul>
                                </Link>
                                <div className="part-2">
                                    <h3 className="product-title">Here Product Title</h3>
                                    <h4 className="product-old-price">$79.99</h4>
                                    <h4 className="product-price">$49.99</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div id="product-2" className="single-product">
                                <Link to="/product" className="part-1">
                                    <span className="discount">15% off</span>
                                    <div className="img"></div>
                                    <ul>
                                        <li><span><i className="fas fa-shopping-cart"></i></span></li>
                                        <li><span><i className="fas fa-heart"></i></span></li>
                                        <li><span><i className="fas fa-plus"></i></span></li>
                                        <li><span><i className="fas fa-expand"></i></span></li>
                                    </ul>
                                </Link>
                                <div className="part-2">
                                    <h3 className="product-title">Here Product Title</h3>
                                    <h4 className="product-price">$49.99</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div id="product-3" className="single-product">
                                <Link to="/product" className="part-1">
                                    <div className="img"></div>
                                    <ul>
                                        <li><span><i className="fas fa-shopping-cart"></i></span></li>
                                        <li><span><i className="fas fa-heart"></i></span></li>
                                        <li><span><i className="fas fa-plus"></i></span></li>
                                        <li><span><i className="fas fa-expand"></i></span></li>
                                    </ul>
                                </Link>
                                <div className="part-2">
                                    <h3 className="product-title">Here Product Title</h3>
                                    <h4 className="product-old-price">$79.99</h4>
                                    <h4 className="product-price">$49.99</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div id="product-4" className="single-product">
                                <Link to="/product" className="part-1">
                                    <span className="new">new</span>
                                    <div className="img"></div>
                                    <ul>
                                        <li><span><i className="fas fa-shopping-cart"></i></span></li>
                                        <li><span><i className="fas fa-heart"></i></span></li>
                                        <li><span><i className="fas fa-plus"></i></span></li>
                                        <li><span><i className="fas fa-expand"></i></span></li>
                                    </ul>
                                </Link>
                                <div className="part-2">
                                    <h3 className="product-title">Here Product Title</h3>
                                    <h4 className="product-price">$49.99</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div id="product-1" className="single-product">
                                <Link to="/product" className="part-1">
                                    <div className="img"></div>
                                    <ul>
                                        <li><span><i className="fas fa-shopping-cart"></i></span></li>
                                        <li><span><i className="fas fa-heart"></i></span></li>
                                        <li><span><i className="fas fa-plus"></i></span></li>
                                        <li><span><i className="fas fa-expand"></i></span></li>
                                    </ul>
                                </Link>
                                <div className="part-2">
                                    <h3 className="product-title">Here Product Title</h3>
                                    <h4 className="product-old-price">$79.99</h4>
                                    <h4 className="product-price">$49.99</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div id="product-2" className="single-product">
                                <Link to="/product" className="part-1">
                                    <span className="discount">15% off</span>
                                    <div className="img"></div>
                                    <ul>
                                        <li><span><i className="fas fa-shopping-cart"></i></span></li>
                                        <li><span><i className="fas fa-heart"></i></span></li>
                                        <li><span><i className="fas fa-plus"></i></span></li>
                                        <li><span><i className="fas fa-expand"></i></span></li>
                                    </ul>
                                </Link>
                                <div className="part-2">
                                    <h3 className="product-title">Here Product Title</h3>
                                    <h4 className="product-price">$49.99</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div id="product-3" className="single-product">
                                <Link to="/product" className="part-1">
                                    <div className="img"></div>
                                    <ul>
                                        <li><span><i className="fas fa-shopping-cart"></i></span></li>
                                        <li><span><i className="fas fa-heart"></i></span></li>
                                        <li><span><i className="fas fa-plus"></i></span></li>
                                        <li><span><i className="fas fa-expand"></i></span></li>
                                    </ul>
                                </Link>
                                <div className="part-2">
                                    <h3 className="product-title">Here Product Title</h3>
                                    <h4 className="product-old-price">$79.99</h4>
                                    <h4 className="product-price">$49.99</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CardComponent;
