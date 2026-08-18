import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useAuth } from "@/context/AuthContext";
import AvatarUser from "@/components/common/Avatar/Avatar";
import { useLogout } from "@/hooks/useLogout";
import { toast } from "react-toastify";
import { Divider } from "primereact/divider";

export default function Sidebar() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { logout } = useLogout();

  const handleLogout = async () => {
    const response = await logout();
    console.log(response);
    if (response.success) {
      toast.success("Vous ête bien deconnecté.");
      navigate("/tweet");
      return;
    }
    toast.error(response.message);
  };

  return (
    <aside className="w-64 h-screen sticky top-0 bg-slate-900 border-rborder-slate-800 p-5 flex flex-col">
      <h1 className="text-2xl font-bold text-teal-400 mb-8">🐦 MonTweet</h1>

      <nav className="flex flex-col gap-3">
        <Button
          label="Accueil"
          icon="pi pi-home"
          text
          className="justify-start text-slate-200"
          onClick={() => navigate("/tweets")}
        />

        <Button
          label="Mon profil"
          icon="pi pi-user"
          text
          className="justify-start text-slate-200"
          onClick={() => navigate("/profile")}
        />

        <Divider
          className=""
          pt={{
            content: {
              className: "bg-slate-900",
            },
          }}
        >
          <span className="text-teal-500 text-xs "> INFOS </span>
        </Divider>
        
        <Button
          label="A propos"
          icon="pi pi-info-circle"
          text
          className="justify-start text-slate-200"
          onClick={() => navigate("/about")}
        />
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-4">
        <div className="flex items-center gap-3 mb-4">
          <AvatarUser pseudo={profile?.pseudo} avatarUrl={profile?.avatarUrl} />

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
  );
}
