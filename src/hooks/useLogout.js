import { useAuth } from "@/context/AuthContext";
import { logoutUserServices } from "@/services/authServices";
import { useState } from "react";

export function useLogout() {
    // States
    const [isLoading, setIsLoading] = useState(false);

    // On récupère le user
    const { user } = useAuth();

    const logout = async () => {

        // Au cas où !
        // if (!user) {
        //     return {
        //         success: false,
        //         message: "Vous n'êtes pas connecté.",
        //         data: null
        //     }
        // }
        try {
            setIsLoading(true);
            await logoutUserServices()
            return {
                success: true,
                data: null,
                message: null
            }
        }
        catch (error) {
            return {
                success: false,
                data: null,
                message: error.message
            }
        }
        finally {
            setIsLoading(false);
        }
    }
    return {
        logout,
        isLoading
    }
}