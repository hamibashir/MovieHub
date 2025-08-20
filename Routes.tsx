// routes.tsx - Updated Router Configuration
import { RouteObject, createBrowserRouter } from 'react-router-dom';

// Layout Component
import Layout from './components/Layout';

// Page Components
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import AddMoviePage from './pages/AddMoviePage';
import EditMoviePage from './pages/EditMoviePage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Route configuration for the Movie Hub application
 * 
 * Routes structure:
 * / - Home page with movie grid
 * /movie/:id - Individual movie detail page
 * /add - Add new movie page (admin only)
 * /edit/:id - Edit movie page (admin only)
 * * - 404 not found page
 */
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // This makes it the default route for /
        element: <HomePage />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: 'add',
        element: <AddMoviePage />,
      },
      {
        path: 'edit/:id',
        element: <EditMoviePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

/**
 * Create and export the router instance
 */
export const router = createBrowserRouter(routes);

/**
 * Export routes for testing purposes
 */
export default routes;