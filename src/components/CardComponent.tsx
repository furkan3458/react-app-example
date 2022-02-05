import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { StateType } from '../state/reducers';
import { Col, Container, Row, Modal } from 'react-bootstrap';

import CardCellComponent from './CardCellComponent';
import CldImageComponent from './CldImageComponent';

import ProductMenuContext,{ProductMenuContextProvider} from '../contexts/ProductMenuContext';

interface CardPropType {
    header: string,
    secondText: string,
}

const CardComponent = (props: CardPropType) => {

    const [isModalShow, setIsModalShow] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [productMenuContext, setProductMenuContext] = useState<ProductMenuContextProvider>();

    const products = useSelector((state: StateType) => state.products);

    useEffect(() => {
        initProductMenuContext();
    }, []);

    const initProductMenuContext = () =>{
        let context:ProductMenuContextProvider = {
            fullscreen : handleFullscreen,
            addCart : handleAddCart,
            addFavorites : handleAddFavorites
        }

        setProductMenuContext(context);
    }
    
    const handleAddFavorites = (id:number) => {
        console.log("handleAddFavorites --CardComponent",id);
    }

    const handleAddCart = (id:number) =>{
        console.log("handleAddCart --CardComponent",id);
    } 

    const handleFullscreen = (id:number, image:string) =>{
        console.log("handleFullscreen --CardComponent",id);
        setModalImage(image);
        setIsModalShow(true);
    }

    return (
        <>
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
                            <CardCellComponent id={1} to={"/product"} title={"Book"} price={100} discount={"15"} image={"leather-bag-gray.jpg"} />
                            <CardCellComponent id={2} to={"/product"} title={"Book"} price={100} discount={"15"} image={"accessories-bag.jpg"} />
                            <CardCellComponent id={3} to={"/product"} title={"Book"} price={100} discount={"15"} image={"car-interior-design.jpg"} />
                            <CardCellComponent id={4} to={"/product"} title={"Book"} price={100} discount={"15"} image={"shoes.jpg"} />
                            <CardCellComponent id={5} to={"/product"} title={"Book"} price={100} discount={"15"} image={"analog-classic.jpg"} />
                        </ProductMenuContext.Provider>
                    </Row>
                </Container>
            </section>
            <Modal show={isModalShow} onHide={()=> setIsModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                < Modal.Header closeButton>
                </Modal.Header >
                <Modal.Body>
                    <CldImageComponent folder={"samples/ecommerce"} name={modalImage} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CardComponent;
