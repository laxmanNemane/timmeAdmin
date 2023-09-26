import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UserMainpage from './pages/Users/UserMainpage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <SimpleLayout />, // Use SimpleLayout for the root route
      children: [
        { path: '', element: <LoginPage /> }, // Login page is the initial landing page
        // Redirect to '/dashboard' after successful login
        // { path: 'dashboard', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserMainpage /> },
        { path: 'products', element: <UserMainpage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    // Handle the 404 page and any other unmatched routes
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
