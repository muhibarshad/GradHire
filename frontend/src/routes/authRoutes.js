// src/routes/AuthGuards.jsx
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const isAuth = useSelector((s) => s.user.isAuthenticated);
  const location = useLocation();

  // If not logged in, redirect to landing ("/") and save current path
  if (!isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}

export function PublicRoute({ children }) {
  const isAuth = useSelector((s) => s.user.isAuthenticated);
  const location = useLocation();

  // If already logged in, send to /user or where they originally wanted
  if (isAuth) {
    const from = location.state?.from?.pathname || '/user';
    return <Navigate to={from} replace />;
  }
  return children;
}
