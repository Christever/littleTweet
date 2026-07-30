import { useEffect, useState } from "react";
import { listenRepliesByTweet } from "@/services/replyService";


export function useReplies(tweetId) {

  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    if (!tweetId) {
      return;
    }


    const unsubscribe = listenRepliesByTweet(
      tweetId,

      (data) => {
        setReplies(data);
        setIsLoading(false);
      },

      (error) => {
        console.error("ERREUR REPLIES :", error.message);
        setError("Impossible de récupérer les réponses.");
        setIsLoading(false);
      }
    );


    return unsubscribe;

  }, [tweetId]);


  return {
    replies,
    isLoading,
    error,
  };
}