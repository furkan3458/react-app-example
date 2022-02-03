import React, { useState,useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { StateType } from './state/reducers';

import NavbarComponent from './components/NavbarComponent';
import SpinnerComponent from  './components/SpinnerComponent';
import FooterComponent from './components/FooterComponent';


const Home = ({...props}: any) => {
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        if(!loaded)
            setLoaded(true);
    }, []);
    
    const auth = useSelector((state: StateType) => state.auth);

    return (
        !loaded ? 
        <>
            <NavbarComponent />
            <SpinnerComponent/>
        </>
        :
        <>
            <NavbarComponent />
            <Container className="px-1">
            </Container>
            <FooterComponent/>
        </>
    );
}

export default Home;