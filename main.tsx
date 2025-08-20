// main.tsx - Application Entry Point
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './index.css'; // Your Tailwind CSS styles

/**
 * Main application entry point
 * Sets up the React Router and renders the application
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);