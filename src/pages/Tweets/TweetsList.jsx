import Loader from "@/components/common/Loader/Loader";
import Title from "@/components/Title/Title";

import TweetCard from "@/components/Tweet/TweetCard";
import { useAuth } from "@/context/AuthContext";
import { useGetAllTweets } from "@/hooks/useGetAllTweets";
import { useTimeline } from "@/hooks/useTimeLine";

import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function Tweets() {
  const navigate = useNavigate();
  const { profile, isLoading: isLoadingAuth } = useAuth();

  // Hooks
  // const { tweets, isLoading, error } = useGetAllTweets()
  const { tweets, isLoading, error } = useTimeline();

  if (error) {
    return (
      <div className="text-center mt-10">
        <Title title="Une erreur est survenue..." subTitle={error} />
      </div>
    );
  }

  if (isLoadingAuth || isLoading) {
    return <Loader />;
  }
  return (
    <div className="mt-4 max-w-3xl mx-auto">
      <Title
        title={"Mon fil"}
        subTitle={`Quoi de neuf, ${profile?.pseudo} ?`}
      />

      <section className="flex flex-col gap-5 mt-10">
        <Button
          label="Écrire un tweet"
          icon="pi pi-pencil"
          className=" bg-teal-600 hover:bg-teal-700 duration-200"
          onClick={() => navigate("/new-tweet")}
        />
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </section>
    </div>
  );
}
