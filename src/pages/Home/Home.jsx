import Footer from "@/components/Footer/Footer";
import Title from "@/components/Title/Title";
import ContainerLayout from "@/layouts/ContainerLayout";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // Nav
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <ContainerLayout>
      <Title
        title={"Bienvenue sur MyLittleTweet"}
        subTitle={
          "Partagez vos idées, vos moments et vos découvertes avec une communauté."
        }
      />
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full flex flex-col max-w-xl mx-auto gap-8">
          <Button
            label="👋 J'ai déjà un compte"
            className="bg-teal-600 hover:bg-teal-700 duration-200 py-3 w-full"
            size="large"
            onClick={handleLogin}
          />

          <span className="text-center">-- ou --</span>
          <Button
            label="✨ Je crée mon compte"
            className="bg-teal-600 hover:bg-teal-700 duration-200 w-full"
            size="large"
            onClick={handleRegister}
          />
        </div>
      </div>
      <Footer />
    </ContainerLayout>
  );
}
