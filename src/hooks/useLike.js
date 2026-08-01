import { likeTweetService, unlikeTweetService } from "@/services/likeService";
import { useState } from "react";

export default function useLike() {
    // State
    const [isLoading, setIsLoading] = useState(false);

    const toggleLike = async (tweetId, hasLiked) => {

        try {
            setIsLoading(true)
            if (hasLiked) {
                await unlikeTweetService(tweetId)
            } else {
                await likeTweetService(tweetId)
            }
            return {
                success: true,
                message: null
            }
        }
        catch (error) {
            console.log("ERREUR LIKE: ", error.message)
            return {
                success: false,
                message: error.message
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        toggleLike
    }

}