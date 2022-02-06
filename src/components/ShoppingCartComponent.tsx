import React, { useState } from 'react';
import { Offcanvas, Row, Col, Badge } from 'react-bootstrap';

interface ShoppingCartProps {
    show: boolean,
    title: string,
    onClose: Function,
}

const ShoppingCartComponent = (props: ShoppingCartProps) => {

    const [show, setShow] = useState(props.show);
    let isShow = props.show;

    const handleClose = () => {
        setShow(false);
        props.onClose();
    }

    return (
        <Offcanvas show={isShow} onHide={handleClose} placement={'end'} scroll={true}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="w-100">
                    <div className="title">
                        <Row>
                            <Col xs={8}>
                                <h4 className=" text-center fw-bold">{props.title}</h4>
                            </Col>
                            <Col xs={4} className="text-center text-muted fs-5">3 items</Col>
                        </Row>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body bsPrefix="container-fluid">
                <Row>
                    <Col md={12} className="cart">
                        <Row>
                            <Row className="main align-items-center">
                                <Col xs={2}>
                                    <img className="img-fluid" src="https://i.imgur.com/1GrakTl.jpg" />
                                </Col>
                                <Col className="fs-7 text-truncate">
                                    <Row className="text-muted">Shirt</Row>
                                    <Row>Cotton T-shirt</Row>
                                </Col>
                                <Col xs={3} className="p-0 text-center fs-5">
                                    <span className="mx-2">-</span>
                                    <Badge bg="info" className="pe-none">1</Badge>
                                    <span className="mx-2">+</span>
                                </Col>
                                <Col>$44.00</Col>
                                <div className="position-absolute end-0 w-auto">
                                    <span className="close">&#10005;</span>
                                </div>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default ShoppingCartComponent;
