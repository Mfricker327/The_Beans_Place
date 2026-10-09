import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// main file responsible for rendering the React application into the DOM. It imports necessary dependencies, including React, ReactDOM, and the main App component. The createRoot method is used to create a root for the React application, and the render method is called to render the App component wrapped in React.StrictMode for highlighting potential problems in the application.