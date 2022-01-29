import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

import store from './state/store';
import routes from './routes';
import ThemeContext from './contexts/ThemeContext';


const Routes = () => { return useRoutes(routes) };

const ReactApp: React.FC = (): JSX.Element => {

  let theme = localStorage.getItem("theme");
  
  if(!theme){
    localStorage.setItem("theme","light"); 
    theme = "light";
  };

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeContext.Provider value={theme}>
            {<Routes />}
          </ThemeContext.Provider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <ReactApp />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
