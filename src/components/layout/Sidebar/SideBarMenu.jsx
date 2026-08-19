import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";


export default function SidebarMenu({ onNavigate }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);

    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <nav className="flex flex-col gap-3">

      <Button
        label="Accueil"
        icon="pi pi-home"
        text
        className="justify-start text-slate-200"
        onClick={() => handleNavigate("/tweets")}
      />

      <Button
        label="Mon profil"
        icon="pi pi-user"
        text
        className="justify-start text-slate-200"
        onClick={() => handleNavigate("/profile")}
      />

      <Divider
        pt={{
          content: {
            className: "bg-slate-900",
          },
        }}
      >
        <span className="text-teal-500 text-xs">
          INFOS
        </span>
      </Divider>

      <Button
        label="À propos"
        icon="pi pi-info-circle"
        text
        className="justify-start text-slate-200"
        onClick={() => handleNavigate("/about")}
      />

    </nav>
  );
}