import z from "zod";

export const tweetSchema = z.object({
    tweet: z
        .string()
        .min(1, "Votre LittleTweet doit faire au moins 1 caractères")
        .max(280, "Votre LittleTweet ne peut pas dépasser 280 caractères.")

})