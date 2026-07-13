import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-(--surface-muted)">
        <div className="flex items-center gap-3 text-(--text-muted)">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-(--text-muted) border-t-transparent" />
          <span>Signing you in...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
