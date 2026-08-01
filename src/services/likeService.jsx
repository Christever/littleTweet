import { auth, database } from "@/firebase/firebase";
import { remove, set, ref } from "firebase/database";

export async function likeTweetService(tweetId ) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Utilisateur non connecté.");
  }

  const likeRef = ref(database, `tweets/${tweetId}/likes/${user.uid}`);

  await set(likeRef, true);
}
export async function unlikeTweetService(tweetId) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Utilisateur non connecté.");
  }

  const likeRef = ref(database, `tweets/${tweetId}/likes/${user.uid}`);

  await remove(likeRef);
}
