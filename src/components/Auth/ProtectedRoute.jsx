import Loader from "@/components/common/Loader/Loader";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  // Context
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  // Pas connecté
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  // On vérifie le rôle, si pas admin on rederige sur la liste des tweets
  if (role && profile?.role !== role) {
    return <Navigate to={"/tweets"} replace />;
  }

  return children;
}
