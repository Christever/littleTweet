import { registerUserService } from "@/services/authServices";
import { resizeImage } from "@/services/imageService";
import { upload } from "@/services/uploadService";
import { useState } from "react";


export function useRegister() {
    const [isLoading, setIsLoading] = useState(false)

    const registerUser = async (data, imageFile) => {
        try {
            setIsLoading(true);
            let imgUrl = "";
            if (imageFile) {
                const optimizeImage = await resizeImage(imageFile)
                imgUrl = await upload(optimizeImage, "avatars")
            }
            const user = await registerUserService(data, imgUrl);
            return {
                success: true,
                data: user,
                message: null
            }
        }
        catch (e) {
            console.log(e.message)
            return {
                success: false,
                message: e.message,
                data: null
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    return {
        registerUser,
        isLoading,
    }
}