import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import a from './units/a'
console.log('index1', a)
// a.n = 11
// console.log('index2', a)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);