import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from './components/ui/toaster.tsx';

import Login from './pages/Login.tsx';

import CreateDesign from './pages/admin/CreateDesign.tsx';
import Orders from './pages/admin/Orders.tsx';
import Reports from './pages/admin/Reports.tsx';
import SavedDesigns from './pages/admin/SavedDesigns.tsx';
import NewOrders from './pages/admin/NewOrders.tsx';
import ProcessingOrders from './pages/client/ProcessingOrders.tsx';
import Purchases from './pages/client/Purchases.tsx';
import SuggestionPage from './pages/client/SuggestionPage.tsx';
import CreateAccount from './pages/CreateAccount.tsx';
import AdminRoot from './root/AdminRoot.tsx';
import ClientRoot from './root/CustomerRoot.tsx';
import PreviewShirt from './pages/PreviewShirt.tsx';

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
        path: 'orders/new',
        element: <NewOrders />,
      },

      {
        path: 'orders/processing',
        element: <ProcessingOrders />,
      },

      {
        path: 'create-design',
        element: <CreateDesign />,
      },

      {
        path: 'preview-design',
        element: <PreviewShirt />,
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
        path: 'purchases',
        element: <Purchases />,
      },
      {
        path: 'preview-design',
        element: <PreviewShirt />,
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
