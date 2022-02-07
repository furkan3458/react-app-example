import React,{useState, useContext} from 'react';
import {Row, Col, Badge} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { StateType } from '../state/reducers';

import ShoppingCartAmountContext from '../contexts/ShoppingCartAmountContext';


interface ShoppingCartCellProps {
    id:number,
    title: string,
    secondText: string,
    image: string,
    amount: number,
    price: number,
}

const ShoppingCartCellComponent = ({ ...props }: ShoppingCartCellProps) => {

    const context = useContext(ShoppingCartAmountContext);

    const cart = useSelector((state: StateType) => state.cart);

    const handleAmountDecrease = () => {
        if(props.amount === 1 || cart.isCartLoading){
            context.toast!("The amount of product cannot be less than one.");
            return;
        }

        context.decrease!(props.id);
    }

    const handleAmountIncrease = () =>{
        if(cart.isCartLoading)
            return;

        context.increase!(props.id);
    }

    const handleItemRemove = () =>{
        context.remove!(props.id);
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
                            <span onClick={()=> handleItemRemove()} className="close">&#10005;</span>
                        </div>
                    </Row>
                </Row>
            </Col>
        </Row>
    );
};

export default ShoppingCartCellComponent;
