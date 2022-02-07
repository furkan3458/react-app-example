import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector, connect } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import reportWebVitals from './reportWebVitals';

import store from './state/store';
import Routes from './routes';

import { StateType } from './state/reducers';
import { setAuthLoading, setAuthFail, setAuthenticated, validateUser } from './state/actions/authActions';
import { setShoppingCart } from './state/actions/cartActions';

import ThemeContext from './contexts/ThemeContext';
import AuthContext, { AuthContextProvider } from './contexts/AuthContext';

import SpinnerComponent from './components/SpinnerComponent';

const ReactApp: React.FC = ({ ...props }: any): JSX.Element => {

  const [authLocale, setauthLocale] = useState("guest");
  const [authenticatedUser, setauthenticatedUser] = useState<AuthContextProvider>();
  const [theme, settheme] = useState("light");
  const [loaded, setloaded] = useState(false);

  const auth = useSelector((state: StateType) => state.auth);
  const cart = useSelector((state: StateType) => state.cart);

  useEffect(() => {
    if (!loaded) {
      setThemeLevel();
      props.validateUser();
      props.setShoppingCart();
    }
  }, []);

  useEffect(() => {
    if (auth.isValidate && cart.isInitializeCart) {
      setAuthLevel();
      setloaded(true);
    }
  }, [auth.isValidate, cart.isInitializeCart]);

  const setAuthLevel = () => {
    auth.user ? buildAuthenticatedUser("user", auth.user) : buildAuthenticatedUser("guest", []);
  }

  const buildAuthenticatedUser = (authType: string, user: any) => {
    let authUser: AuthContextProvider = {
      authType: authType,
      authenticatedUser: {
        token: "",
        id: 0,
        fullname: "",
        username: "",
        email: "",
        roles: []
      }
    }
    if (authType === "user") {
      authUser.authenticatedUser.token = user.token;
      authUser.authenticatedUser.id = user.id;
      authUser.authenticatedUser.fullname = user.fullname;
      authUser.authenticatedUser.username = user.username;
      authUser.authenticatedUser.email = user.email;
      authUser.authenticatedUser.roles = user.roles;
    }

    setauthLocale(authType);
    setauthenticatedUser(authUser);
  }

  const setThemeLevel = () => {
    let themeStorage = localStorage.getItem("theme");

    if (!themeStorage) {
      localStorage.setItem("theme", "light");
      themeStorage = "light";
    }
    settheme(themeStorage);
  }

  return ((!loaded || !auth.isValidate || !cart.isInitializeCart) ? <SpinnerComponent /> :
    <BrowserRouter>
      <HelmetProvider>
        <AuthContext.Provider value={authenticatedUser!}>
          <ThemeContext.Provider value={theme}>
            <Routes auth={authLocale} />
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </HelmetProvider>
    </BrowserRouter>
  );
};

const mapDispatchToProps = { setAuthLoading, setAuthFail, setAuthenticated, validateUser, setShoppingCart };
const ConectedReactApp = connect(null, mapDispatchToProps)(ReactApp);

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ConectedReactApp />
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
