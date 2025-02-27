import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from './components/ui/toaster.tsx';

import Login from './pages/Login.tsx';

import Payment from './pages/Payment.tsx';
import SMS from './pages/SMS.tsx';
import AdminRoot from './root/AdminRoot.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminRoot />,
    children: [
      {
        path: 'sms',
        element: <SMS />,
      },

      {
        path: 'payment',
        element: <Payment />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
