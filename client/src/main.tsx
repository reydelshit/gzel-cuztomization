import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from './components/ui/toaster.tsx';

import Login from './pages/Login.tsx';

import CreateDesign from './pages/admin/CreateDesign.tsx';
import Orders from './pages/admin/Orders.tsx';
import Reports from './pages/admin/Reports.tsx';
import CreateAccount from './pages/CreateAccount.tsx';
import AdminRoot from './root/AdminRoot.tsx';
import SavedDesigns from './pages/admin/SavedDesigns.tsx';
import ClientRoot from './root/CustomerRoot.tsx';
import SuggestionPage from './pages/client/SuggestionPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminRoot />,
    children: [
      {
        path: 'reports',
        element: <Reports />,
      },

      {
        path: 'orders',
        element: <Orders />,
      },

      {
        path: 'create-design',
        element: <CreateDesign />,
      },

      {
        path: 'saved-designs',
        element: <SavedDesigns />,
      },
    ],
  },

  {
    path: '/client',
    element: <ClientRoot />,
    children: [
      {
        path: 'create-design',
        element: <CreateDesign />,
      },
      {
        path: 'saved-designs',
        element: <SavedDesigns />,
      },

      {
        path: 'suggestions',
        element: <SuggestionPage />,
      },

      {
        path: 'orders',
        element: <div> List of Customers Orders</div>,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },

  {
    path: 'create',
    element: <CreateAccount />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
