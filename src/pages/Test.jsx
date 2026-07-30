// import Loader from "@/components/common/Loader";
import Loader from "@/components/common/Loader/Loader";
import { useAuth } from "@/context/AuthContext";
// import { useLogout } from "@/hooks/useLogout";

import { Button } from "primereact/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogout } from "@/hooks/useLogout";

export default function Test() {
  // Variables
  const navigate = useNavigate();

  // Hook
  const { logout } = useLogout();

  // Context
  const { user, profile, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success("Vous ête bien deconnecté.");
      navigate("/");
      return;
    }
    toast.error(response.message);
  };
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl">Test Auth</h1>

      <div>
        <p>Email : {user.email}</p>

        <p>Pseudo : {profile?.pseudo}</p>

        <p>Rôle : {profile?.role}</p>
      </div>

      <Button
        label="Déconnexion"
        icon="pi pi-sign-out"
        onClick={handleLogout}
      />
    </div>
  );
}
