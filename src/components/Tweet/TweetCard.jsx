import Loader from "@/components/common/Loader/Loader";
import ReplyForm from "@/components/ReplyForm/ReplyForm";
import ReplyList from "@/components/ReplyList/ReplyList";
import { useAuth } from "@/context/AuthContext";

import useLike from "@/hooks/useLike";
import { formatRelativeDate } from "@/utils/date";

import { Card } from "primereact/card";
import { useState } from "react";
import AvatarUser from "./../common/Avatar/Avatar";

export default function TweetCard({ tweet }) {
  // States
  const [showReply, setShowReply] = useState(false);

  // Hook
  const { isLoading, toggleLike } = useLike();

  // Récuperation de l'utilisateur
  const { user } = useAuth();

  console.log(tweet);

  // Variables
  const likesCount = Object.keys(tweet.likes ?? {}).length;
  const hasLiked = !!tweet.likes?.[user.uid];
  const header = (
    <div className="flex items-center gap-2 p-2">
      {/* <i className="pi pi-user text-teal-400 text-lg" /> */}
      <AvatarUser pseudo={tweet.pseudo} avatarUrl={tweet.avatarUrl} />
      <h2 className="text-teal-400 font-semibold">{tweet.pseudo}</h2>
    </div>
  );

  if (isLoading) {
    return <Loader />;
  }
  return (
    <article>
      <Card
        header={header}
        className="bg-slate-900 border border-slate-800 rounded-xl"
      >
        {tweet.photoURL ? (
          <img
            src={tweet.photoURL}
            alt="Photo du tweet"
            className="w-full max-h-[500px] object-contain"
          />
        ) : null}
        <p className="text-slate-200 text-lg mt-4">{tweet.content}</p>

        <div className="flex justify-between items-center mt-5 text-sm text-slate-400">
          <div className="flex gap-6">
            <button
              className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} hover:text-teal-400 duration-200`}
              onClick={() => toggleLike(tweet.id, hasLiked)}
            >
              {hasLiked ? "❤️" : "🤍"} {likesCount}
            </button>

            <button
              className="hover:text-teal-400 duration-200"
              onClick={() => setShowReply(!showReply)}
            >
              💬 Répondre
            </button>
          </div>

          <span>{formatRelativeDate(tweet.createdAt)}</span>
        </div>
        {showReply && (
          <ReplyForm tweetId={tweet.id} onSuccess={() => setShowReply(false)} />
        )}
        <ReplyList tweetId={tweet.id} />
      </Card>
    </article>
  );
}
