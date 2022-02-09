import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { Collapse } from 'bootstrap';
import $ from 'jquery';

import { StateType } from '../state/reducers';

import { logoutAction } from '../state/actions/authActions';

import ThemeContext from '../contexts/ThemeContext';
import AuthContext from '../contexts/AuthContext';

import ShoppingCartComponent from './ShoppingCartComponent';

interface customLinkType {
    to?: string,
    header: string,
    clsName?: string | '',
    span?: boolean | true,
    children?: React.ReactNode,
    as?: "button" | "link",
    func?: Function
}

const NavbarComponent = ({ ...props }: any) => {

    const [shoppingCartShow, setShoppingCartShow] = useState(false);
    const toggleMenu = useRef<HTMLAnchorElement>(null);
    const navClone = useRef<HTMLUListElement>(null);

    const cart = useSelector((state: StateType) => state.cart);

    useEffect(() => {
        siteMenuClone();
    }, []);

    useEffect(() => {
        return () => {
            closeCanvas();
        }
    }, []);

    const ListElementLink = (params: customLinkType): JSX.Element => {
        let location = useLocation();
        const isSpan = params.span === undefined ? true : params.span;
        const clsName = params.clsName === undefined ? "" : params.clsName;

        let child = <NavLink to={params.to!}>{isSpan ? <span>{params.header}</span> : params.header}</NavLink>;
        if (params.as && params.as === "button")
            child = <a onClick={() => params.func!()}>{isSpan ? <span>{params.header}</span> : params.header}</a>;

        return (
            <li className={clsName + (location.pathname === params.to ? " active" : "")}>
                {child}
            </li>
        );
    }

    const DropdownLink: React.FC<customLinkType> = (params: customLinkType) => {
        let location = useLocation();
        const isSpan = params.span === undefined ? true : params.span;
        const clsName = params.clsName === undefined ? "" : params.clsName;
        let child = <NavLink to={params.to!}>{isSpan ? <span>{params.header}</span> : params.header}</NavLink>;

        if (params.as && params.as === "button")
            child = <a onClick={() => params.func!()}>{isSpan ? <span>{params.header}</span> : params.header}</a>;

        return (
            <li className={clsName + (location.pathname === params.to ? " active" : "")}>
                {child}
                {params.children}
            </li>
        );
    }

    const handleMenuToggle = (e: any) => {
        if (toggleMenu.current === null)
            return;

        let $this = $(toggleMenu.current);

        $this.toggleClass('active');
        $('body').toggleClass('offcanvas-menu');
    }

    const arrowCollapseClick = (e: any) => {
        let $this = $(e.target);
        let target = $this.data('target');

        $this.toggleClass('active');
        $this.toggleClass('collapsed');

        new Collapse(target, { toggle: true, parent: $this });

        e.preventDefault();
    }

    const siteMenuClone = () => {
        $(document).on("mouseup", function (e: any) {
            var container = $(".site-mobile-menu");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                closeCanvas();
            }
        });
    };

    const closeCanvas = () => {
        if ($('body').hasClass('offcanvas-menu')) {
            $('body').removeClass('offcanvas-menu');
        }
    }

    const onLogout = () => {
        const jwtToken = localStorage.getItem("jwtKey");
        props.logoutAction({ token: jwtToken });
    }

    const handleShoppingCartClick = () => {
        setShoppingCartShow(true);
    }

    const handleShoppingCartClose = () => {
        setShoppingCartShow(false);
    }

    return (
        <ThemeContext.Consumer>{value => (
            <AuthContext.Consumer>{auth => (
                <header className="site-navbar border-bottom" role="banner">
                    <div className="site-mobile-menu">
                        <div className="site-mobile-menu-header">
                            <div className="site-mobile-menu-close mt-3">
                                <span onClick={() => closeCanvas()} className="fa-solid fa-xmark js-menu-toggle"></span>
                            </div>
                        </div>
                        <div className="site-mobile-menu-body">
                            <ul className="site-nav-wrap">
                                <ListElementLink key={"1"} to={"/"} header={"Home"} />
                                <DropdownLink key={"6"} to={"/dropdown"} header={"Dropdown"} clsName={"has-children"}>
                                    <span onClick={(e) => arrowCollapseClick(e)} className="arrow-collapse collapsed" data-toggle="collapse" data-target="#collapseItem0"></span>
                                    <ul className="collapse" id="collapseItem0">
                                        <ListElementLink key={"2"} to={"/menu_1"} header={"Menu-1"} />
                                        <ListElementLink key={"3"} to={"/menu_2"} header={"Menu-2"} />
                                        <ListElementLink key={"4"} to={"/menu_3"} header={"Menu-3"} />
                                        <DropdownLink key={"6"} to={"/menu_4"} header={"Menu-4"} clsName={"has-children"}>
                                            <span onClick={(e) => arrowCollapseClick(e)} className="arrow-collapse collapsed" data-toggle="collapse" data-target="#collapseItem1"></span>
                                            <ul className="collapse" id="collapseItem1">
                                                <ListElementLink key={"7"} to={"/menu_5"} header={"Menu-1"} />
                                                <ListElementLink key={"8"} to={"/menu_6"} header={"Menu-2"} />
                                                <ListElementLink key={"9"} to={"/menu_7"} header={"Menu-3"} />
                                                <ListElementLink key={"10"} to={"/menu_8"} header={"Menu-4"} />
                                            </ul>
                                        </DropdownLink>
                                    </ul>
                                </DropdownLink>
                                <ListElementLink key={"11"} to={"/listings"} header={"Listings"} />
                                <ListElementLink key={"12"} to={"/about"} header={"About"} />
                                <ListElementLink key={"13"} to={"/blog"} header={"Blog"} />
                                <ListElementLink key={"14"} to={"/contact"} header={"Contact"} />
                            </ul>
                        </div>
                        <>
                            {auth.authType === "guest" ?
                                <div className="d-flex site-mobile-menu-footer border-top">
                                    <Link to="/login" className="text-app-gray mx-2">Login</Link>
                                    <Link to="/signup" className="text-app-gray mx-2">Signup</Link>
                                </div>
                                :
                                <div>
                                    <ul className="site-nav-wrap border-top">
                                        <li className="has-children">
                                            <div>{auth.authenticatedUser.fullname}</div>
                                            <span onClick={(e) => arrowCollapseClick(e)} className="arrow-collapse" data-toggle="collapse" data-target="#collapseItem3"></span>
                                            <ul className="collapse" id="collapseItem3">
                                                <ListElementLink key={"8"} as="button" header={"Logout"} func={() => onLogout()} />
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </>
                    </div>
                    <Container fluid={true}>
                        <Row className='align-items-center'>
                            <Col xl={{ span: '2' }} xs={'3'}>
                                <h1 className="mb-0 site-logo text-center">
                                    <Link to="/" className="text-app-gray mb-0">Brand</Link>
                                </h1>
                            </Col>
                            <Col xs={'10'} md={'8'} className="d-none d-xl-block">
                                <nav className="site-navigation position-relative text-center">
                                    <ul ref={navClone} className="site-menu js-clone-nav me-auto d-none d-lg-block">
                                        <ListElementLink key={"1"} to={"/"} header={"Home"} />
                                        <DropdownLink key={"6"} to={"/dropdown"} header={"Dropdown"} clsName={"has-children"}>
                                            <ul className="dropdown arrow-top">
                                                <ListElementLink key={"2"} to={"/menu_1"} header={"Menu-1"} />
                                                <ListElementLink key={"3"} to={"/menu_2"} header={"Menu-2"} />
                                                <ListElementLink key={"4"} to={"/menu_3"} header={"Menu-3"} />
                                                <DropdownLink key={"5"} to={"/menu_4"} header={"Menu-4"} span={false} clsName={"has-children"}>
                                                    <ul className="dropdown">
                                                        <ListElementLink key={"7"} to={"/menu_5"} header={"Menu-1"} />
                                                        <ListElementLink key={"8"} to={"/menu_6"} header={"Menu-2"} />
                                                        <ListElementLink key={"9"} to={"/menu_7"} header={"Menu-3"} />
                                                        <ListElementLink key={"10"} to={"/menu_8"} header={"Menu-4"} />
                                                    </ul>
                                                </DropdownLink>
                                            </ul>
                                        </DropdownLink>
                                        <ListElementLink key={"11"} to={"/listings"} header={"Listings"} />
                                        <ListElementLink key={"12"} to={"/about"} header={"About"} />
                                        <ListElementLink key={"13"} to={"/blog"} header={"Blog"} />
                                        <ListElementLink key={"14"} to={"/contact"} header={"Contact"} />
                                    </ul>
                                </nav>
                            </Col>
                            <Col xl={2} className="d-none d-xl-flex fs-6 mobile-nav-right">
                                {auth.authType === "guest" ?
                                    <>
                                        <div className="mx-2"><Link to="/login" className="text-app-gray">Login</Link></div>
                                        <div className={"mx-2" + (cart.productCount === 0 ? " me-4" : "")}><Link to="/signup" className="text-app-gray">Signup</Link></div>
                                    </> :
                                    <nav className="site-navigation position-relative text-center">
                                        <ul className="site-menu me-auto d-none d-lg-block">
                                            <li className="has-children">
                                                <span>{auth.authenticatedUser.fullname}</span>
                                                <ul className="dropdown arrow-top">
                                                    <ListElementLink key={"8"} as="button" header={"Logout"} func={() => onLogout()} />
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                }
                                <div className="d-flex align-items-center" onClick={() => handleShoppingCartClick()}>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    {cart.productCount !== 0 && <Badge bg="danger" pill={true}>{cart.productCount}</Badge>}
                                </div>
                            </Col>
                            <Col className="d-xl-none ms-md-0 me-auto py-3 mobile-nav-right" xs={'9'}>
                                <div>
                                    <Link to="/login" className="text-app-gray"><i className="fa-solid fa-arrow-right-to-bracket"></i></Link>
                                </div>
                                <div>
                                    <Link to="/signup" className="text-app-gray"><i className="fa-solid fa-user-plus"></i></Link>
                                </div>
                                <div onClick={() => handleShoppingCartClick()}>
                                    <i className="fa-solid fa-cart-shopping text-app-gray"></i>
                                    {cart.productCount !== 0 && <Badge bg="danger" pill={true}>{cart.productCount}</Badge>}
                                </div>
                                <div>
                                    <span ref={toggleMenu} onClick={(e) => handleMenuToggle(e)} className="site-menu-toggle js-menu-toggle text-app-gray">
                                        <i className="fa-solid fa-bars"></i>
                                    </span>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                    <ShoppingCartComponent show={shoppingCartShow} title={"Shopping Cart"} onClose={() => handleShoppingCartClose()} />
                </header>
            )}
            </AuthContext.Consumer>
        )}
        </ThemeContext.Consumer>
    );
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
