import React, { useState, useRef, useEffect } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import $ from 'jquery';

import { StateType } from './state/reducers';
import { setLoading, setAuthenticated, setUser } from './state/actions/authActions';

import NavbarComponent from './components/NavbarComponent';
import SpinnerComponent from  './components/SpinnerComponent';
import FooterComponent from './components/FooterComponent';

export const Login = ({ ...props }: any) => {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [rememberme, setRememberme] = useState(true);
    const [loaded, setLoaded] = useState(false);

    const auth = useSelector((state: StateType) => state.auth);
    console.log(auth);

    const passwordSpan = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        console.log('useEffect');
        if (!loaded)
            setLoaded(true);
    }, []);

    const onTogglePasswordClick = () => {
        if (passwordSpan.current === null)
            return;

        let $this = $(passwordSpan.current);

        $this.toggleClass("fa-eye fa-eye-slash");

        var input = $($this.data("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    }

    const onSubmitFormClick = (e: any) => {
        e.preventDefault();
        console.log("Submit", username, password, rememberme);
    }

    return (!loaded ?
        <>
            <NavbarComponent />
            <SpinnerComponent/>
        </>
        :
        <>
            <NavbarComponent />
            <section className="ftco-section text-black">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={'6'} className="text-center mb-5">
                            <h2 className="heading-section">Login</h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={'6'} lg={'4'}>
                            <div className="login-wrap p-0">
                                <h3 className="mb-4 text-center">Have an account?</h3>
                                <Form className="signin-form">
                                    <Form.Group className="form-group" controlId="formUsername">
                                        <Form.Control type="text" onChange={(e) => setusername(e.target.value)} placeholder="Username" required />
                                    </Form.Group>
                                    <Form.Group className="form-group d-md-flex" controlId="formPassword">
                                        <Form.Control type="password" onChange={(e) => setpassword(e.target.value)} placeholder="Password" required />
                                        <span ref={passwordSpan} onClick={() => onTogglePasswordClick()} data-toggle="#formPassword" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Button type="submit" onClick={(e) => onSubmitFormClick(e)} className="btn-submit px-3">Login</Button>
                                    </Form.Group>
                                    <Form.Group className="form-group d-md-flex">
                                        <div className="w-50">
                                            <label className="checkbox-wrap checkbox-primary">Remember Me
                                                <input type="checkbox" onChange={(e) => setRememberme(e.target.checked)} defaultChecked />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="w-50 text-md-end">
                                            <Link to="/forgot_password" style={{ color: "#212529" }}>Forgot Password</Link>
                                        </div>
                                    </Form.Group>
                                </Form>
                                <p className="w-100 text-center" style={{ color: "#212529" }}>&mdash; Or Sign In With &mdash;</p>
                                <div className="social d-flex text-center">
                                    <Link to="/login_google" className="px-2 py-2 me-md-1 rounded"><span className="fa-brands fa-google mr-2"></span> Google</Link>
                                    <Link to="/login_twitter" className="px-2 py-2 ms-md-1 rounded"><span className="fa-brands fa-twitter mr-2"></span> Twitter</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <FooterComponent/>
        </>
    );
};

const mapDispatchToProps = { setLoading, setAuthenticated, setUser };
export default connect(null, mapDispatchToProps)(Login);
