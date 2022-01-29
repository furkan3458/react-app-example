import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import $ from 'jquery';
import { Collapse } from 'bootstrap';

import ThemeContext from '../contexts/ThemeContext';

interface customLinkType {
    to: string,
    header: string,
    clsName?: string | '',
    span?: boolean | true,
    children?: React.ReactNode
}

const NavbarComponent = () => {

    const toggleMenu = useRef<HTMLAnchorElement>(null);
    const navClone = useRef<HTMLUListElement>(null);

    const [cloneLoaded, setcloneLoaded] = useState(false);

    useEffect(() => {
        siteMenuClone();
    }, []);


    const ListElementLink = (params: customLinkType): JSX.Element => {
        let location = useLocation();
        const isSpan = params.span === undefined ? true : params.span;
        const clsName = params.clsName === undefined ? "" : params.clsName;

        return (<li className={clsName + (location.pathname === params.to ? " active" : "")}><NavLink to={params.to}>{isSpan ? <span>{params.header}</span> : params.header}</NavLink></li>)
    }

    const DropdownLink: React.FC<customLinkType> = (params: customLinkType) => {
        let location = useLocation();
        const isSpan = params.span === undefined ? true : params.span;
        const clsName = params.clsName === undefined ? "" : params.clsName;

        return (
            <li className={clsName + (location.pathname === params.to ? " active" : "")}>
                <NavLink to={params.to}>{isSpan ? <span>{params.header}</span> : params.header}</NavLink>
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

    const siteMenuClone = () => {
        if (navClone.current === null || cloneLoaded)
            return;

        let $this = $(navClone.current);
        let counter = 0;

        $('.site-mobile-menu-body').empty();
        $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');

        
        $('.site-mobile-menu .has-children').each(function () {
            let $this = $(this);

            $this.prepend('<span class="arrow-collapse collapsed">');

            $this.find('.arrow-collapse').attr({
                'data-toggle': 'collapse',
                'data-target': '#collapseItem' + counter,
            });

            $this.find('> ul').attr({
                'class': 'collapse',
                'id': 'collapseItem' + counter,
            });

            counter++;

        });

        $('body').on('click', '.arrow-collapse', function (e: any) {
            let $this = $(this);
            let target = $this.data('target');

            $this.toggleClass('active');
            $this.toggleClass('collapsed');

            new Collapse(target, {toggle: true, parent:$this})

            e.preventDefault();
        });

        $(document).on("mouseup", function (e: any) {
            var container = $(".site-mobile-menu");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        });
        setcloneLoaded(true);
    };

    return (
        <ThemeContext.Consumer>{value => (

            <header className="site-navbar border-bottom" role="banner">
                <div className="site-mobile-menu">
                    <div className="site-mobile-menu-header">
                        <div className="site-mobile-menu-close mt-3">
                            <span className="icon-close2 js-menu-toggle"></span>
                        </div>
                    </div>
                    <div className="site-mobile-menu-body"></div>
                </div>
                <Container fluid={true}>
                    <Row className='align-items-center'>
                        <Col xl={{ span: '2' }} xs={'3'}>
                            <h1 className="mb-0 site-logo text-center">
                                <Link to="/" className="text-black mb-0">Brand</Link>
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
                        <Col xl={2} className="d-none d-xl-flex fs-6">
                            <div className="mx-1"><Link to="/login" className="text-black">Login</Link></div>
                            <div className="mx-1"><Link to="/signup" className="text-black">Signup</Link></div>
                        </Col>
                        <Col className="d-inline-block d-xl-none ms-md-0 me-auto py-3 text-end" xs={'9'} style={{ position: "relative", top: 3 + "px" }}>
                            <a href="#" ref={toggleMenu} onClick={(e) => handleMenuToggle(e)} className="site-menu-toggle js-menu-toggle text-black">
                                <i className="fa-solid fa-bars"></i>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </header>
        )}
        </ThemeContext.Consumer>
    );
}

export default NavbarComponent;
