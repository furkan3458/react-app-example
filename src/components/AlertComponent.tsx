import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

interface AlertProps {
    header:string,
    text:string,
    show: boolean,
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
    dismissible?: boolean,
    onClose?: Function
}

const AlertComponent = (props:AlertProps) => {
    
    const [show, setShow] = useState(props.show);
    let isShow = props.show;

    const handleClose = () =>{
        console.log("Alert close");
        isShow = false;

        setShow(false);

        if(props.onClose)
            props.onClose();
    }

    return (
        <>
            <Alert onClose={()=> handleClose()} show={isShow} variant={props.variant} dismissible>
                <Alert.Heading>{props.header}</Alert.Heading>
                <p className="text-black">{props.text}</p>
            </Alert>
        </>
    );
}

export default AlertComponent;
