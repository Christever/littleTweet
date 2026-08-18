import { resizeImage } from "@/services/imageService";
import { createTweetService } from "@/services/tweetService";
import { upload } from "@/services/uploadService";
import { useState } from "react";


export function useCreateTweet() {
    const [isLoading, setIsLoading] = useState(false)

    const createTweet = async (data, photoFile) => {
        try {
            setIsLoading(true)
            let photoURL = "";
            if (photoFile){
                const optimizeImage = await resizeImage(photoFile)
                photoURL = await upload(optimizeImage, "photos")
            }
            const tweet = await createTweetService(data, photoURL)

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