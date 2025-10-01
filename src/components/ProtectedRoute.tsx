import { Navigate } from "react-router-dom";
import { showErrorToast } from "@/utils/toast";
import { useEffect, useMemo } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, isLoggedIn, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("access_token");
  const isAuthenticated = isLoggedIn || !!token;

  const userString = localStorage.getItem("user");
  const user = useMemo(() => (userString ? JSON.parse(userString) : null), [userString]);
  const userRole = useMemo(() => user?.role?.toLowerCase(), [user]);

  const isAuthorized = useMemo(() => {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true; // No specific roles required
    }
    if (userRole === 'super_user') {
      return true; // Super user is always authorized
    }
    return userRole && allowedRoles.includes(userRole);
  }, [userRole, allowedRoles]);

  useEffect(() => {
    if (!isAuthenticated) {
      showErrorToast("Please log in to access this page");
    } else if (!isAuthorized) {
      showErrorToast("You are not authorized to view this page.");
    }
  }, [isAuthenticated, isAuthorized]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    const getDashboardPathForRole = (role) => {
      const specialRoles = ['admin', 'agent', 'owner'];
      if (role && specialRoles.includes(role)) {
          return `/${role}`;
      }
      return '/dashboard'; // Default for customer, super_user, and any other case.
    };
    const defaultDashboard = getDashboardPathForRole(userRole);
    return <Navigate to={defaultDashboard} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;