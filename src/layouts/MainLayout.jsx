import Loader from "@/components/common/Loader/Loader";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Loader/>
    )
  }
  return (
    <div className="flex min-h bg-slate-950">
      {user && (
        <Sidebar/>
      )}
      {/* Header */}

      {/* Content */}
      <div className="w-full">
        <Outlet />
      </div>

      {/* Footer */}
    </div>
  );
}
