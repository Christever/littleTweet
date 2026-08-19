// React libraries
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Context / Hooks ....
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/hooks/useLogout";

// Primereact
import { Button } from "primereact/button";
import { Sidebar as PrimeSideBar } from "primereact/sidebar";

// Components
import AvatarUser from "@/components/common/Avatar/Avatar";

import { useState } from "react";
import SidebarMenu from "@/components/layout/Sidebar/SideBarMenu";

export default function Sidebar() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { logout } = useLogout();

  const handleLogout = async () => {
    const response = await logout();

    if (response.success) {
      toast.success("Vous êtes bien deconnecté.");
      navigate("/");
      return;
    }
    toast.error(response.message);
  };

  return (
    <>
      <aside
        className="
          hidden md:flex w-64 h-screen  sticky top-0 bg-slate-900  border-r
        border-slate-800 p-5 flex-col"
      >
        <h1 className="text-2xl font-bold text-teal-400 mb-8">🐦 MonTweet</h1>

        {/* Menu */}
        <SidebarMenu />

        <div className="mt-auto border-t border-slate-800 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <AvatarUser
              pseudo={profile?.pseudo}
              avatarUrl={profile?.avatarUrl}
            />

            <span className="text-slate-200">{profile?.pseudo}</span>
          </div>

          <Button
            label="Déconnexion"
            icon="pi pi-sign-out"
            severity="danger"
            text
            className="justify-start"
            onClick={handleLogout}
          />
        </div>
      </aside>

      {/* =========================
          BOUTON BURGER MOBILE
      ========================= */}
      <div className="md:hidden fixed top-0 left-0 z-40 p-3">
        <Button
          icon="pi pi-bars"
          text
          className="text-slate-200"
          onClick={() => setMobileMenuVisible(true)}
        />

        {/* =========================
          SIDEBAR MOBILE
      ========================= */}
        <PrimeSideBar
          visible={mobileMenuVisible}
          onHide={() => setMobileMenuVisible(false)}
          className="bg-slate-900"
        >
          <div className="flex flex-col h-full">
            <h1 className="text-2xl font-bold text-teal-400 mb-8">
              🐦 MonTweet
            </h1>

            <SidebarMenu onNavigate={() => setMobileMenuVisible(false)} />

            <div className="mt-auto border-t border-slate-800 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <AvatarUser
                  pseudo={profile?.pseudo}
                  avatarUrl={profile?.avatarUrl}
                />

                <span className="text-slate-200">{profile?.pseudo}</span>
              </div>

              <Button
                label="Déconnexion"
                icon="pi pi-sign-out"
                severity="danger"
                text
                className="justify-start"
                onClick={handleLogout}
              />
            </div>
          </div>
        </PrimeSideBar>
      </div>
    </>
  );
}
