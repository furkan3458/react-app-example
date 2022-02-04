import React, { useState,useEffect } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { StateType } from './state/reducers';

import SliderComponent from './components/SliderComponent';
import NavbarComponent from './components/NavbarComponent';
import SpinnerComponent from  './components/SpinnerComponent';
import FooterComponent from './components/FooterComponent';
import CardComponent from './components/CardComponent';


const Home = ({...props}: any) => {
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        if(!loaded)
            setLoaded(true);
    }, []);
    
    const auth = useSelector((state: StateType) => state.auth);
    const products = useSelector((state: StateType) => state.products);

    return (
        (!loaded || products.isProductLoading) ? 
        <>
            <NavbarComponent />
            <SpinnerComponent/>
        </>
        :
        <>
            <NavbarComponent />
            <Container>
                <Row>
                    <Col>
                        <SliderComponent />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CardComponent />
                    </Col>
                </Row>
            </Container>
            <FooterComponent/>
        </>
    );
}

export default Home;