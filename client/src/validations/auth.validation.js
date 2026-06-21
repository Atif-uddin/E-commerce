import { z } from "zod";

export const registerSchema = z.object({
    fullname: z.string().min(3, "Full name must be at least 3 characters"),

    email: z.string().email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    phoneNumber: z.string().min(10, "Phone number must be 10 digits")
});

export const loginSchema = z.object({
    email: z.email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters")
});

export const verifyEmailSchema = z.object({
    otp : z.string().min(6, 'OTP must be 6 digits')
})