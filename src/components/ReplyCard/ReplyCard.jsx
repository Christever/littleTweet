import AvatarUser from "@/components/common/Avatar/Avatar";
import { formatRelativeDate } from "@/utils/date";

export default function ReplyCard({ reply }) {
  return (
    <article className="border-l-2 border-slate-700 pl-4 py-2">
      <div className=" flex gap-2 mb-2">
        <AvatarUser small pseudo={reply.pseudo} />
        {reply.pseudo ?? reply.userId}
      </div>

      <p className="text-slate-200 font-semibold">{reply.content}</p>

      <small className="text-slate-400">
        {formatRelativeDate(reply.createdAt)}
      </small>
    </article>
  );
}
