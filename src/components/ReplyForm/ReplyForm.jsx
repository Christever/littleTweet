import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { useCreateReply } from "@/hooks/useCreateReply";

export default function ReplyForm({ tweetId, onSuccess }) {
  const [content, setContent] = useState("");

  const { createReply, isLoading } = useCreateReply();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    const result = await createReply(tweetId, content);

    if (result.success) {
      setContent("");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      <InputTextarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Votre réponse..."
        rows={3}
      />

      <Button
        label="Répondre"
        icon="pi pi-send"
        loading={isLoading}
        className="bg-teal-600 hover:bg-teal-700"
      />
    </form>
  );
}
