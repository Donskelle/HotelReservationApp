import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import App from './components/App';


(ReactDOM as any).createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
