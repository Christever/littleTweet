import { loginUserService } from "@/services/authServices";
import { use, useState } from "react";
import { success } from "zod";


export function useLogin() {
    // State
    const [isLoading, setIsLoading] = useState(false)

    const loginUser = async (data) => {
        try {
            setIsLoading(true);
            const user = await loginUserService(data)
            return {
                success: true, 
                message: null,
                data: user
            }
        }
        catch (error) {
            return {
                success: false,
                message: "Impossible de vous connecter",
                data: null
            }
        }
        finally {
            setIsLoading(false)
        }
    }
    return {
        loginUser,
        isLoading
    }
}