import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

function SpinnerComponent() {
    return (
        <Container>
            <Row className="min-vh-100">
                <Col xs={12} className="d-flex justify-content-center align-items-center">
                    <div className="loader animation-5">
                        <div className="shape shape1"></div>
                        <div className="shape shape2"></div>
                        <div className="shape shape3"></div>
                        <div className="shape shape4"></div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default SpinnerComponent;
