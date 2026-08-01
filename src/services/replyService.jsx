import { auth, database } from "@/firebase/firebase";
import { onValue, ref, set, push } from "firebase/database";

export function listenReplies(callback, errorCallback) {
  const repliesRef = ref(database, "replies");

  // onValue : Permet d' écouter la base en temps réel
  const unsubscribe = onValue(
    repliesRef,
    (snapshot) => {
      if (!snapshot.exists()) {
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
        .sort((a, b) => b.createdAt - a.createdAt);

      callback(replies);
    },
    (error) => {
      errorCallback(error);
    },
  );

  return unsubscribe;
}

export async function createReplyService(
  tweetId,
  content,
  parentReplyId = null,
) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Utilisateur non connecté");
  }

  const replyRef = push(ref(database, "replies"));
  const reply = {
    tweetId,
    parentReplyId,
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
