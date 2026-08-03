import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useAuth } from "@/context/AuthContext";
import AvatarUser from "@/components/common/Avatar/Avatar";
import { updateProfileService } from "@/services/userService";

export default function ProfileForm() {
  const { profile } = useAuth();

  const [pseudo, setPseudo] = useState(profile?.pseudo ?? "");

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
 
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateProfileService({
        pseudo,
      }, profile.pseudo);
    } catch (error) {
      console.error("Erreur modification profil :", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6"
    >
      <div className="flex flex-col items-center gap-4">
        <AvatarUser pseudo={pseudo} avatarUrl={profile?.avatarUrl} />

        <Button
          type="button"
          label="Changer la photo"
          icon="pi pi-image"
          text
        />
      </div>

      <div className="mt-8">
        <label className="block text-slate-300 mb-2">Pseudo</label>

        <InputText
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        label="Enregistrer"
        icon="pi pi-save"
        loading={isLoading}
        className=" mt-6 bg-teal-600 hover:bg-teal-700"
      />
    </form>
  );
}
