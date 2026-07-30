
import ReplyForm from "@/components/ReplyForm/ReplyForm";
import { formatRelativeDate } from "@/utils/date";

import { Card } from "primereact/card";
import { useState } from "react";

export default function TweetCard({ tweet }) {
  const [showReply, setShowReply] = useState(false);
  const header = (
    <div className="flex items-center gap-2 p-2">
      <i className="pi pi-user text-teal-400 text-lg" />
      <h2 className="text-teal-400 font-semibold">{tweet.pseudo}</h2>
    </div>
  );
  return (
    <article>
      <Card
        header={header}
        className="bg-slate-900 border border-slate-800 rounded-xl"
      >
        <p className="text-slate-200 text-lg">{tweet.content}</p>

        <div className="flex justify-between items-center mt-5 text-sm text-slate-400">
          <div className="flex gap-6">
            <button className="hover:text-teal-400 duration-200">
              ❤️ {tweet.likes}
            </button>

            <button className="hover:text-teal-400 duration-200" onClick={()=>setShowReply(!showReply)}>
              💬 Répondre
            </button>

            {showReply && (
              <ReplyForm tweetId={tweet.id}/>
            )}

           
          </div>

          <span>{formatRelativeDate(tweet.createdAt)}</span>
        </div>
      </Card>
    </article>
  );
}
