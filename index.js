import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Ваш корневой компонент

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Элемент, куда будет рендериться приложение
);