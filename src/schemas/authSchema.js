import { z } from "zod"

export const registerSchema = z.object({
    pseudo: z
        .string()
        .min(5, "Votre pseudo doit contenir au moins 5 caractères."),
    email: z
        .string()
        .email("email invalide"),
    password: z
        .string()
        .min(6, "Votre mot de passe doit contenir au moins 6 caractères."),
    confirmPassword: z
        .string(),
})
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Les mots de passe ne correspondent pas.",
            path: ["confirmPassword"]
        }
    )


export const loginSchema = z
    .object({
        email: z
            .string()
            .email("email invalide"),
        password: z
            .string()
            .min(1, "Le mot de passe est obligatoire")

    })