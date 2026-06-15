import { z } from "zod";

export const adminLoginSchema = z.object({
    
    email: z.email("Invalid Email Address").trim().toLowerCase(),

    password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long")
});