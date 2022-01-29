import React, { useState,useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

import NavbarComponent from './components/NavbarComponent';
import SpinnerComponent from  './components/SpinnerComponent';
import FooterComponent from './components/FooterComponent';

const Home = ({...props}: any) => {
    console.log(props);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        if(!loaded)
            setLoaded(true);
    }, []);
    
    const useHandleClick = () => {
        console.log("button click");
    }

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