import { createReplyService } from "@/services/replyService";
import { useState } from "react";

export function useCreateReply() {
    // States
    const [isLoading, setIsLoading] = useState(false)

    const createReply = async (tweetId, content) => {
        try {
            setIsLoading(true)
            await createReplyService(tweetId, content)

            return {
                success: true,
                message: null
            }
        }
        catch (error) {
            return {
                success: false,
                message: "Impossible de réponde à ce tweet"
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    return {
        createReply,
        isLoading
    }
}