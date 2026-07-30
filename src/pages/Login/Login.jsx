import Loader from "@/components/common/Loader/Loader";
import Title from "@/components/Title/Title";
import { useLogin } from "@/hooks/useLogin";
import ContainerLayout from "@/layouts/ContainerLayout";
import { loginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  // Hooks
  const { loginUser, isLoading } = useLogin();
  // Utilisatiion de Zod pour validation des inputs
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await loginUser(data);

    if (result.success) {
      toast.success("Vous êtes bien connecté.");
      navigate("/tweets");
      return;
    }
    toast.error(result.message);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ContainerLayout>
      <Title
        title={"Bienvenue sur MyLittleTweet"}
        subTitle={
          "Partagez vos idées, vos moments et vos découvertes avec une communauté."
        }
      />
      <h2 className="text-xl text-center mt-10"> Content de vous revoir 😊</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col flex-1 w-full max-w-md mx-auto gap-6"
      >
        {/* Saisie Email */}
        <div className="flex flex-col gap-1">
          <InputText
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            placeholder="Votre email..."
            {...register("email")}
            className="input"
            autoFocus
            keyfilter={"email"}
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
                feedback={false}
                inputClassName="w-full input"
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
            )}
          />
          {errors.password && (
            <small id="password-error" className="text-rose-400 text-sm">
              {errors.password.message}
            </small>
          )}
        </div>
        <div className="w-full flex flex-col max-w-xl mx-auto gap-8">
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            label="Me connecter"
            type="submit"
            size="large"
            icon="pi pi-sign-in"
          />
          {/* <span className="text-center">-- Ou --</span> */}
          <Button
            severity="secondary"
            label="Retour"
            type="button"
            icon="pi pi-arrow-left"
            outlined
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </ContainerLayout>
  );
}
