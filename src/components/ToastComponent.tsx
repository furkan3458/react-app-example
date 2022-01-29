import React, {useState} from 'react';
import { Toast,ToastContainer } from 'react-bootstrap';
interface ToastProps {
    position: 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end',
    type:string,
    delay:number,
    text:string,
    show:boolean,
    header:string,
    close?: Function | undefined,
    autohide:boolean,
    iconClass:string,
}

const ToastComponent = (props: ToastProps) => {

    const [show, setShow] = useState(props.show);
    let isShow = props.show;

    const handleClose = () => {
        isShow = false;
        setShow(false);

        if(props.close)
            props.close();
    }

    return (
        <ToastContainer className="p-3" style={{zIndex:2}} position={props.position}>
            <Toast onClose={()=> handleClose()} show={isShow} delay={props.delay} bg={props.type.toLowerCase()} autohide={props.autohide}>
                <Toast.Header>
                    <strong className="me-auto"><i className={props.iconClass + " me-2"}></i>{props.header}</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{props.text}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastComponent;
