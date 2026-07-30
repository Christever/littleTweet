import { auth, database } from "@/firebase/firebase";
import { onValue, ref, set } from "firebase/database";

export function listenReplies(callback, errorCallback) {
  const repliesRef = ref(database, "replies");

  // onValue : Permet d' écouter la base en temps réel
  const unsubscribe = onValue(
    repliesRef,
    (snapshot) => {
      if (!snapshot) {
        callback([]);
        return;
      }

      const data = snapshot.val();

      // On renvoie les réponses en forme de tableau, triés du plus récent au plus ancien
      const replies = Object.entries(data)
        .map(([id, reply]) => ({
          id,
          ...reply,
        }))
        .filter((reply) => reply.tweetId === tweetId)
        .sort((a, b) => a.createdAt - b.createdAt);
      callback(replies);
    },
    (error) => {
      errorCallback(error);
    },
  );

  return unsubscribe;
}

export async function createReplyService(tweetId, content) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Utilisateur non connecté");
  }

  const replyRef = ref(database, "replies");
  const reply = {
    tweetId,
    userId: user.uid,
    content,
    createdAt: Date.now(),
  };

  await set(replyRef, reply);

  return {
    id: replyRef.key,
    ...reply,
  };
}
