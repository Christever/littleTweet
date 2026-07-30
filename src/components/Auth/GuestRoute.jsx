import Loader from "@/components/common/Loader/Loader";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  // Context
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  //  connecté on redirige vers la liste des tweets
  if (user) {
    return <Navigate to={"/tweets"} replace />;
  }

  return children;
}
