import { listenTweets } from "@/services/tweetService";
import { useEffect, useState } from "react";

export function useGetAllTweets() {
    // States
    const [isLoading, setIsLoading] = useState(true)
    const [tweets, setTweets] = useState([])
    const [error, setError] = useState(null)


    // Cycle

    useEffect(() => {
        const unsubscribe = listenTweets((data) => {
            setTweets(data)
            setIsLoading(false)
        },
            (error) => {
                console.error("ERREUR FIREBASE", error.message)
                setError("Impossible de récupérer les tweets")
                setIsLoading(false)

            }
        )

        return unsubscribe
    }, [])

    return {
        tweets,
        isLoading,
        error
    }
}