import { createTweetService } from "@/services/tweetService";
import { useState } from "react";


export function useCreateTweet() {
    const [isLoading, setIsLoading] = useState(false)

    const createTweet = async (data) => {
        try {
            setIsLoading(true)
            const tweet = await createTweetService(data)

            return {
                success: true,
                message: null,
                data: tweet
            }
        }
        catch (error) {
            console.log(error.mesage)

            return {
                success: false,
                message: error.message,
                data: null
            }
        }
        finally {
            setIsLoading(false)
        }
    }
    return {
        createTweet,
        isLoading,
    }
}