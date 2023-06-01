import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ActionsProvider from './Contexts/ActionsContext';
import ImageProvider from './Contexts/imageContext';
import App from './App';
import Home from './Views/Home';
import Menu from './Views/Menu';

import './css/App.css';
import SettingsProvider from './Contexts/SettingsContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/menu",
    element: <Menu></Menu>
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SettingsProvider>
      <ImageProvider>
        <ActionsProvider>
          <App>
            <RouterProvider router={router} />
          </App>
        </ActionsProvider>
      </ImageProvider>
    </SettingsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
