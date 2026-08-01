import Footer from "@/components/common/Footer/Footer";
import Title from "@/components/common/Title/Title";
import { useRegister } from "@/hooks/useRegister";
import ContainerLayout from "@/layouts/ContainerLayout";
import { registerSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  // Hook
  const { isLoading, success, registerUser } = useRegister();
  // Utilisatiion de Zod pour validation des inputs
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      pseudo: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result.success) {
      toast.success("Compte crée avec succès");
      navigate("/login");
      return;
    }
    toast.error(result.error);
  };

  return (
    <ContainerLayout>
      <Title
        title={"Bienvenue sur MyLittleTweet"}
        subTitle={
          "Partagez vos idées, vos moments et vos découvertes avec une communauté."
        }
      />
      <h2 className="text-xl text-center mt-10">
        Prêt à nous rejoindre ? Créez votre compte 🚀
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col flex-1 w-full max-w-md mx-auto gap-6"
      >
        {/* Saisie pseudo */}
        <div className="flex flex-col gap-1">
          <InputText
            aria-invalid={!!errors.pseudo}
            aria-describedby="pseudo-error"
            placeholder="Votre pseudo..."
            {...register("pseudo")}
            className="input"
            autoFocus
          />
          {errors.pseudo && (
            <small id="pseudo-error" className="text-rose-400 text-sm">
              {errors.pseudo.message}
            </small>
          )}
        </div>

        {/* Saisie Email */}
        <div className="flex flex-col gap-1">
          <InputText
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            placeholder="Votre email..."
            {...register("email")}
            className="input"
          />
          {errors.email && (
            <small id="email-error" className="text-rose-400 text-sm">
              {errors.email.message}
            </small>
          )}
        </div>

        {/* Saisie MDP */}
        <div className="flex flex-col gap-1">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Password
                {...field}
                placeholder="mot de passe"
                inputClassName="w-full input"
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                weakLabel="Trop simple"
                mediumLabel="Moyen"
                strongLabel="Fort"
              />
            )}
          />
          {errors.password && (
            <small id="password-error" className="text-rose-400 text-sm">
              {errors.password.message}
            </small>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Password
                {...field}
                placeholder="Confirmation"
                inputClassName="w-full input"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirmPassword"
              />
            )}
          />
          {errors.confirmPassword && (
            <small
              id="confirmaPassword-error"
              className="text-rose-400 text-sm"
            >
              {errors.confirmPassword.message}
            </small>
          )}
        </div>

        <Button
          className="bg-teal-600"
          label="Creer mon compte"
          type="submit"
          icon="pi pi-user-plus"
          size="large"
        />
        <Button
          className="bg-teal-600"
          label="Retour"
          type="button"
          icon="pi pi-arrow-left"
          onClick={() => navigate(-1)}
        />
      </form>

      <Footer />
    </ContainerLayout>
  );
}
