import {z} from 'zod'

//registerSchema
export const registerSchema = z.object({
    fullname: z.string().min(3, "fullname must be atleast 3 characters"),
    email: z.email('Invalid Email!'),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    phoneNumber: z.string().min(10, "phone number must be 10 digits").max(15, "Phone number is too long")
})

//verifyEmail schema
export const verifyEmailSchema = z.object({
    email: z.email('Invalid Email'),
    otp: z.string().length(6, "OTP must be 6 digits")
})

//LoginSchema
export const loginSchema = z.object({
    email: z.email('Ivalid Email'),
    password: z.string().min(8)
})

//resendOtpSchema
export const resendOtpSchema = z.object({
    email: z.email('Invalid Email')
})