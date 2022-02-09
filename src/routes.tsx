import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';

interface RouteProps {
    auth: "guest" | "user" | string;
}

const Routes = (props: RouteProps) => {

    const guestRoutes: RouteObject[] = [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        }
    ];

    const userRoutes: RouteObject[] = [
        {
            path: "/",
            element: <Home />,
        }
    ];

    const defaultRoutes: RouteObject[] = props.auth === "guest" ? guestRoutes : userRoutes;

    defaultRoutes.push(
        {
            path: "*",
            element: <Error />,
        }
    );
    const routes = useRoutes(defaultRoutes);
    return (
        <>{routes}</>
    );
}

export default Routes;