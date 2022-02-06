import React, {useState} from 'react';
import {Offcanvas} from 'react-bootstrap';

interface ShoppingCartProps{
    show:boolean,
    title:string,
    onClose:Function,
}

const ShoppingCartComponent = (props:ShoppingCartProps) => {

    const [show, setShow] = useState(props.show);
    let isShow = props.show;

    const handleClose = () =>{
        setShow(false);
        props.onClose();
    }

    return (
        <Offcanvas show={isShow} onHide={handleClose} placement={'end'} scroll={true}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="fs-2 fw-bold">{props.title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default ShoppingCartComponent;
