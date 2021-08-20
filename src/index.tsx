import React from 'react';
import ReactDOM from 'react-dom';
import './global/global-styles.scss';
import { Home } from './templates/Home';


ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);
