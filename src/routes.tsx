import { RouteObject } from 'react-router-dom';

import Home from './Home';
import Login from './Login';


const routes:RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path:"/login",
        element:<Login />
    }
]

export default routes;