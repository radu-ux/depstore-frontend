import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import store from './application/store/store'
import ProductsContainer from './views/container/ProductsContainer';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <ProductsContainer />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);