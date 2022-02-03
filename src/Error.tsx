import { Container, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Error = () => {

    return (
        <Container>
            <Row className="min-vh-100">
                <Col xs={12} className="d-flex flex-wrap justify-content-center align-items-center">
                    <div className="loader animation-7">
                        <div className="shape shape1"></div>
                        <div className="shape shape2"></div>
                        <div className="shape shape3"></div>
                        <div className="shape shape4"></div>
                    </div>
                    <div className="message-box">
                        <h1>404</h1>
                        <p>Page not found</p>
                        <div className="d-flex align-items-center">
                            <Link to="/" className="btn-lg btn-live-blue">Go Home</Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Error;
