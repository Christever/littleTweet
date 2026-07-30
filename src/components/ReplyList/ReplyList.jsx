import Loader from "@/components/common/Loader/Loader";
import ReplyCard from "@/components/ReplyCard/ReplyCard";

import { useReplies } from "@/hooks/useReplies";

export default function ReplyList({ tweetId }) {

  console.log("ReplyList tweetId :", tweetId);
  const { replies, isLoading, error } = useReplies(tweetId);

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <p className="text-rose-400 text-sm">{error}</p>;
  }

  if (replies.length === 0) {
    return null;
  }

  return (
    <section className="mt-4 ml-8 flex flex-col gap-3">
      {replies.map((reply) => (
        <ReplyCard key={reply.id} reply={reply} />
      ))}
    </section>
  );
}
