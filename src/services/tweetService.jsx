import { auth, database } from "@/firebase/firebase";
import { push, ref, set, onValue } from "firebase/database";

export async function createTweetService(data, photoURL) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Utilisateur non connecté");
  }

  const tweetRef = push(ref(database, "tweets"));

  const tweet = {
    userId: user.uid,
    content: data.tweet,
    createdAt: Date.now(),
    photoURL: photoURL || null,
  };

  await set(tweetRef, tweet);
  return {
    id: tweetRef.key,
    ...tweet,
  };
}

export function listenTweets(callback, errorCallback) {
  const tweetsRef = ref(database, "tweets");

  // onValue : Permet d' écouter la base en temps réel
  const unsubscribe = onValue(
    tweetsRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }

      const data = snapshot.val();

      // On renvoie les tweets en forme de tableau, triés du plus récent au plus ancien
      const tweets = Object.entries(data)
        .map(([id, tweet]) => ({
          id,
          ...tweet,
        }))
        .sort((a, b) => b.createdAt - a.createdAt);

      callback(tweets);
    },
    (error) => {
      errorCallback(error);
    },
  );

  return unsubscribe;
}
