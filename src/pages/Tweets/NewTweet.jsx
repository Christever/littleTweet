import Loader from "@/components/common/Loader/Loader";
import Title from "@/components/common/Title/Title";
import { useCreateTweet } from "@/hooks/useCreateTweet";
import ContainerLayout from "@/layouts/ContainerLayout";
import { tweetSchema } from "@/schemas/tweetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewTweet() {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Hook
  const { createTweet, isLoading } = useCreateTweet();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(tweetSchema),
    mode: "onChange",
    defaultValues: {
      tweet: "",
    },
  });

  const tweet = watch("tweet");

  const handlePublish = async (data) => {
    const result = await createTweet(data, imageFile);
    if (result.success) {
      toast.success("LittleTweet publié avec succès");
      navigate("/tweets");
      return;
    } else {
      toast.error(result.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ContainerLayout>
      <Title title={"Ecrire un LittleTweet ?"} />
      <form
        onSubmit={handleSubmit(handlePublish)}
        className="mt-6 flex flex-col flex-1 w-full max-w-xl mx-auto gap-6"
      >
        <InputTextarea
          rows={6}
          placeholder="Que voulez-vous partager aujourd'hui ?..."
          {...register("tweet")}
          autoFocus
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="">Insérer une photo</label>
            <input
              placeholder="Photo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />

            {imagePreview && (
              <div className="mt-1">
                <img
                  src={imagePreview}
                  alt="apercu"
                  className=" object-cover rounded-lg shadow"
                />
              </div>
            )}
          </div>
        </div>
        <p
          className={`flex justify-end ${tweet.length > 280 ? "text-rose-600" : "text-teal-100"} `}
        >
          {tweet.length} / 280
        </p>
        {errors.tweet && (
          <small className="text-rose-400 text-sm">
            {errors.tweet.message}
          </small>
        )}
        <div className=" w-full flex flex-col max-w-xl mx-auto gap-8">
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            label="Publier le LttleTweet"
            type="submit"
            size="large"
            disabled={!isValid}
          />

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
