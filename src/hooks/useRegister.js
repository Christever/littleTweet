import { registerUserService } from "@/services/authServices";
import { useState } from "react";


export function useRegister() {
    const [isLoading, setIsLoading] = useState(false)

    const registerUser = async (data) => {
        try {
            setIsLoading(true);
            const user = await registerUserService(data);
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