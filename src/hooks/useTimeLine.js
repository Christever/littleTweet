import { useEffect, useState } from "react";
import { listenTweets } from "@/services/tweetService";
import { listenUsers } from "@/services/userService";

export function useTimeline() {
    // States
    const [tweets, setTweets] = useState([]);               // Les tweets
    const [users, setUsers] = useState({});                 // Les utilisateurs

    const [isLoading, setIsLoading] = useState(true);
    const [tweetsLoaded, setTweetsLoaded] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false)

    const [error, setError] = useState(null)

    // écoute des utilisateurs
    // Dès qu'un changement est effectué sur le pseudo, c'est automatiquement répercuté
    useEffect(() => {
        const unsubscribe = listenUsers(
            (data) => {
                setUsers(data)
                setUsersLoaded(true)
            },
            (error) => {
                console.error("ERREUR USERS: ", error.message)
                setError("Impossible de récupérer les utilisateurs.")
                setUsersLoaded(true)
            }
        );
        return unsubscribe;
    }, []);

    // écoute des tweets
    // Dès qu'un changement est effectué sur le tweet, c'est automatiquement répercuté
    useEffect(() => {
        const unsubscribe = listenTweets(
            (data) => {
                setTweets(data);
                setTweetsLoaded(true);
            },
            (error) => {
                console.error("ERREUR TWEETS: ", error.message);
                setError("Impossible de récupérer les tweets")
                setTweetsLoaded(false);
            }
        );
        return unsubscribe;
    }, []);

    // Chargement global
    useEffect(() => {
        if (tweetsLoaded && usersLoaded) {
            setIsLoading(false)
        }
    }, [tweetsLoaded, usersLoaded])

    // tweets contient entre-autre le userId, qui correspont à l'ID de la collection users
    // users[tweet.userId]  récupère l'utilisateur qui a l' userID
    // users[tweet.userId]?.pseudo -> pseudo de l'utilisateur
    const timeline = tweets.map((tweet) => ({
        ...tweet,
        pseudo: users[tweet.userId]?.pseudo ?? "Utilisateur inconnu",
    }));

    return {
        tweets: timeline,
        isLoading,
        error
    };
}