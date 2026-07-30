import { useEffect, useState } from "react";
import { listenReplies } from "@/services/replyService";
import { listenUsers } from "@/services/userService";


export function useReplies(tweetId) {

  const [replies, setReplies] = useState([]);
  const [users, setUsers] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);

  const [error, setError] = useState(null);


  // écoute des utilisateurs
  useEffect(() => {

    const unsubscribe = listenUsers(
      (data) => {
        setUsers(data);
        setUsersLoaded(true);
      },
      (error) => {
        console.error("ERREUR USERS :", error.message);
        setError("Impossible de récupérer les utilisateurs.");
        setUsersLoaded(true);
      }
    );

    return unsubscribe;

  }, []);



  // écoute des réponses
  useEffect(() => {

    const unsubscribe = listenReplies(
      (data) => {
        setReplies(data);
        setRepliesLoaded(true);
      },
      (error) => {
        console.error("ERREUR REPLIES :", error.message);
        setError("Impossible de récupérer les réponses.");
        setRepliesLoaded(true);
      }
    );

    return unsubscribe;

  }, []);



  // chargement global
  useEffect(() => {

    if (repliesLoaded && usersLoaded) {
      setIsLoading(false);
    }

  }, [repliesLoaded, usersLoaded]);



  // filtre + ajout du pseudo
  const timelineReplies = replies
    .filter(reply => reply.tweetId === tweetId)
    .map(reply => ({
      ...reply,
      pseudo: users[reply.userId]?.pseudo ?? "Utilisateur inconnu"
    }));


  return {
    replies: timelineReplies,
    isLoading,
    error
  };
}