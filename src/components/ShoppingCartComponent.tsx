import { useState, useEffect } from 'react';
import { Offcanvas, Row, Col } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';

import { StateType } from '../state/reducers';
import { CartProductType } from '../state/reducers/cartReducer';
import { setShoppingCartUpdate, setShoppingCartRemove } from '../state/actions/cartActions';

import ShoppingCartCellComponent from './ShoppingCartCellComponent';
import ToastComponent from './ToastComponent';

import ShoppingCartAmountContext, { AmountContextProdiver } from '../contexts/ShoppingCartAmountContext';

interface ShoppingCartProps {
    show: boolean,
    title: string,
    onClose: Function,
    setShoppingCartUpdate?: Function,
    setShoppingCartRemove?: Function
}

const ShoppingCartComponent = (props: ShoppingCartProps) => {

    const [show, setShow] = useState(props.show);
    const [toastShow, setToastShow] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [amountMenuContext, setAmountMenuContext] = useState<AmountContextProdiver>();
    const cart = useSelector((state: StateType) => state.cart);

    let isShow = props.show;

    useEffect(() => {
        initAmountSectionContext();
    }, []);

    useEffect(() => {
        if(!cart.isCartLoading)
            saveCartToLocal();

    }, [cart.isCartLoading]);

    const initAmountSectionContext = () => {
        let context: AmountContextProdiver = {
            increase: handleIncreaseAmount,
            decrease: handleDecreaseAmount,
            remove: handleRemoveItem,
            toast: handleToast,
        }

        setAmountMenuContext(context);
    }

    const saveCartToLocal = () => {
        localStorage.setItem("chart", JSON.stringify(cart.cartProducts));
        localStorage.setItem("chart-count",Number(cart.cartProducts.length).toString());
    }

    const handleIncreaseAmount = (id: number) => {
        const cartProducts: CartProductType[] = cart.cartProducts;

        const index = cartProducts.findIndex(value => { return value.id === id });

        let cartProduct: CartProductType = Object.assign({}, cartProducts[index]);
        cartProduct.amount = cartProduct.amount + 1;

        props.setShoppingCartUpdate!(cartProduct, index);
    }

    const handleDecreaseAmount = (id: number) => {
        const cartProducts: CartProductType[] = cart.cartProducts;

        const index = cartProducts.findIndex(value => { return value.id === id });

        let cartProduct: CartProductType = Object.assign({}, cartProducts[index]);
        cartProduct.amount = cartProduct.amount - 1;

        props.setShoppingCartUpdate!(cartProduct, index);
    }

    const handleRemoveItem = (id: number) => {
        const cartProducts: CartProductType[] = cart.cartProducts;

        const index = cartProducts.findIndex(value => { return value.id === id });
        let cartProduct: CartProductType = Object.assign({}, cartProducts[index]);

        props.setShoppingCartRemove!(cartProduct, index);
    }

    const handleToast = (message:string) =>{
        setToastMessage(message);
        setToastShow(true);
    }

    const handleClose = () => {
        setShow(false);
        handleToastClose();
        props.onClose();
    }

    const handleToastClose = () =>{
        setToastShow(false);
    }

    return (
        <>
            <ToastComponent type={"Danger"} position={"bottom-start"} text={toastMessage}
                show={toastShow} header={"Brand"} iconClass={"fa-solid fa-circle"} delay={5000} autohide={true} close={() => handleToastClose()} />
            <Offcanvas show={isShow} onHide={handleClose} placement={'end'} scroll={true}>
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title className="w-100">
                        <div className="title">
                            <Row>
                                <Col xs={8}>
                                    <h4 className=" text-center fw-bold">{props.title}</h4>
                                </Col>
                                <Col xs={4} className="text-center text-muted fs-5">{cart.productCount} items</Col>
                            </Row>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body bsPrefix="container-fluid">
                    <ShoppingCartAmountContext.Provider value={amountMenuContext!}>
                        {
                            cart.cartProducts.map((item: CartProductType, index: number) => {
                                return <ShoppingCartCellComponent key={index} id={item.id} title={item.name} secondText={item.secondtext} image={item.image} amount={item.amount} price={item.price} />
                            })
                        }
                    </ShoppingCartAmountContext.Provider>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = { setShoppingCartUpdate, setShoppingCartRemove };

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartComponent);
