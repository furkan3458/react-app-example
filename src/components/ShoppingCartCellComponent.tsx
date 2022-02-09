import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { StateType } from '../state/reducers';
import { CartProductType } from '../state/reducers/cartReducer';


import ShoppingCartAmountContext, { AmountContextProdiver } from '../contexts/ShoppingCartAmountContext';
import ToastContext, { ToastContextProvider } from '../contexts/ToastContext';

interface ShoppingCartCellProps {
    id: number,
    title: string,
    secondText: string,
    image: string,
    amount: number,
    price: number,
}

const ShoppingCartCellComponent = ({ ...props }: ShoppingCartCellProps) => {
    const [lastAmount, setLastAmount] = useState(props.amount);
    const [isAmountClicked, setIsAmountClicked] = useState(false);

    const context = useContext<AmountContextProdiver>(ShoppingCartAmountContext);
    const toastContext = useContext<ToastContextProvider>(ToastContext);

    const cart = useSelector((state: StateType) => state.cart);

    useEffect(() => {
        if (!cart.isCartLoading && isAmountClicked) {
            setIsAmountClicked(false);
            checkItemOnChart();
        }
    }, [cart.isCartLoading])


    const handleAmountDecrease = () => {
        if (props.amount === 1) {
            toastContext.toastError("The amount of product cannot be less than one.");
            return;
        }
        else if (cart.isCartLoading) {
            toastContext.toastInfo("Please wait...");
            return;
        }

        setLastAmount(getLastAmount());
        setIsAmountClicked(true);

        context.decrease!(props.id);
    }

    const handleAmountIncrease = () => {
        if (cart.isCartLoading) {
            toastContext.toastInfo("Please wait...");
            return;
        }

        setLastAmount(getLastAmount());
        setIsAmountClicked(true);
        context.increase!(props.id);
    }

    const handleItemRemove = () => {
        context.remove!(props.id);
    }

    const getLastAmount = ():number => {
        const cartProducts: CartProductType[] = cart.cartProducts;
        const index = cartProducts.findIndex(value => { return value.id === props.id });

        return index !== -1 ? cartProducts[index].amount : 0;
    }

    const checkItemOnChart = () => {
        const cartProducts: CartProductType[] = cart.cartProducts;

        const index = cartProducts.findIndex(value => { return value.id === props.id });

        if (index !== -1 && lastAmount !== cartProducts[index].amount)
            toastContext.toastSuccess("Product has successfully updated.");
        else
            toastContext.toastError("The product could not be added to your cart.");
    }

    return (
        <Row>
            <Col md={12} className="cart-cell">
                <Row>
                    <Row className="main align-items-center">
                        <Col xs={2}>
                            <img className="img-fluid" src="https://i.imgur.com/1GrakTl.jpg" />
                        </Col>
                        <Col className="fs-7 text-truncate">
                            <Row className="text-muted">{props.title}</Row>
                            <Row>{props.secondText}</Row>
                        </Col>
                        <Col xs={3} className="p-0 text-center fs-5 user-select-none">
                            <span onClick={() => handleAmountDecrease()} className="mx-2">-</span>
                            <Badge bg="info" className="pe-none">{props.amount}</Badge>
                            <span onClick={() => handleAmountIncrease()} className="mx-2">+</span>
                        </Col>
                        <Col>${props.price}</Col>
                        <div className="position-absolute end-0 w-auto">
                            <span onClick={() => handleItemRemove()} className="close">&#10005;</span>
                        </div>
                    </Row>
                </Row>
            </Col>
        </Row>
    );
};

export default ShoppingCartCellComponent;
