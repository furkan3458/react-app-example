import { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Col, Container, Row, Modal } from 'react-bootstrap';

import { StateType } from '../state/reducers';

import { CartProductType } from '../state/reducers/cartReducer';

import { setShoppingCartAdd, setShoppingCartUpdate } from '../state/actions/cartActions';

import CardCellComponent from './CardCellComponent';
import ToastComponent from './ToastComponent';
import CldImageComponent from './CldImageComponent';

import ProductMenuContext, { ProductMenuContextProvider } from '../contexts/ProductMenuContext';

interface CardPropType {
    header: string,
    secondText: string,
    setShoppingCartAdd?: Function,
    setShoppingCartUpdate?: Function
}

const CardComponent = (props: CardPropType) => {
    const [isModalShow, setIsModalShow] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [toastShow, settoastShow] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [productMenuContext, setProductMenuContext] = useState<ProductMenuContextProvider>();

    const products = useSelector((state: StateType) => state.products);
    const auth = useSelector((state: StateType) => state.auth);
    const cart = useSelector((state: StateType) => state.cart);

    useEffect(() => {
        initProductMenuContext();
    }, []);

    useEffect(() => {
        if(!cart.isCartLoading)
            saveCartToLocal();
            
    }, [cart.isCartLoading]);

    const initProductMenuContext = () => {
        let context: ProductMenuContextProvider = {
            fullscreen: handleFullscreen,
            addCart: handleAddCart,
            addFavorites: handleAddFavorites,
            toastCallback: handleToastCallback
        }

        setProductMenuContext(context);
    }

    const saveCartToLocal = () => {
        localStorage.setItem("chart", JSON.stringify(cart.cartProducts));
        localStorage.setItem("chart-count",Number(cart.cartProducts.length).toString());
    }

    const handleAddFavorites = (id: number) => {
        if (!auth.isAuthenticated) {
            console.log(auth);
            setToastMessage("You must be logged in to add the product to your favourites.")
            settoastShow(true);
        }
    }

    const handleAddCart = (id: number, ref: HTMLDivElement) => {
        if (ref == null)
            return;

        const cartProducts: CartProductType[] = cart.cartProducts;

        const index = cartProducts.findIndex(value => { return value.id === id });

        //product state içerisinden id bulunup alınacak
        if (index === -1) {
            let cartProduct: CartProductType = {
                id: id,
                amount: 1,
                name: "Test",
                secondtext: "Test2",
                image: "",
                price: 100,
            };

            props.setShoppingCartAdd!(cartProduct);
        } else {
            //Fiyat güncellemeside yap!!
            let cartProduct: CartProductType = Object.assign({},cartProducts[index]);
            cartProduct.amount = cartProduct.amount + 1;

            props.setShoppingCartUpdate!(cartProduct, index);
        }
    }

    const handleFullscreen = (id: number, image: string) => {
        setModalImage(image);
        setIsModalShow(true);
    }

    const handleToastCallback = (message: string) => {
        setToastMessage(message);
        settoastShow(true);
    }

    const handleToastClose = () => {
        settoastShow(false);
    }

    return (
        <>
            <ToastComponent type={"Danger"} position={"bottom-end"} text={toastMessage}
                show={toastShow} header={"Brand"} iconClass={"fa-solid fa-circle"} delay={5000} autohide={true} close={() => handleToastClose()} />
            <section className="section-products">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col md={8} lg={6}>
                            <div className="header">
                                <h2>{props.header}</h2>
                                <h3>{props.secondText}</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <ProductMenuContext.Provider value={productMenuContext!}>
                            <CardCellComponent id={1} to={"/product"} title={"Leather Bag"} price={100} oldPrice={120} discount={"15"} image={"leather-bag-gray.jpg"} />
                            <CardCellComponent id={2} to={"/product"} title={"Accessories"} price={100} tag={"New"} image={"accessories-bag.jpg"} />
                            <CardCellComponent id={3} to={"/product"} title={"Car"} price={100} image={"car-interior-design.jpg"} />
                            <CardCellComponent id={4} to={"/product"} title={"Shoes"} price={100} image={"shoes.jpg"} />
                            <CardCellComponent id={5} to={"/product"} title={"Watch"} price={100} image={"analog-classic.jpg"} />
                        </ProductMenuContext.Provider>
                    </Row>
                </Container>
            </section>
            <Modal show={isModalShow} onHide={() => setIsModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                < Modal.Header closeButton>
                </Modal.Header >
                <Modal.Body>
                    <CldImageComponent folder={"samples/ecommerce"} name={modalImage} />
                </Modal.Body>
            </Modal>
        </>
    );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = { setShoppingCartAdd, setShoppingCartUpdate };

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);
