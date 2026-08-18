import Loader from "@/components/common/Loader/Loader";
import Title from "@/components/common/Title/Title";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/pages/Profile/components/ProfilForm";

export default function Profile() {
  const { profile, isLoading } = useAuth();

  if (isLoading){
    return <Loader/>
  }

  if (!profile) {
    return null
  }
  return (
    <div className="mt-4 max-w-3xl mx-auto mb-4">
      <Title title={"Mon profil"} subTitle={`Bienvenue, ${profile.pseudo}`} />

      <ProfileForm/>
    </div>
  );
}
