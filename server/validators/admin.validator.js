import { z } from "zod";
import mongoose from "mongoose";

export const adminLoginSchema = z.object({

    email: z.email("Invalid Email Address").trim().toLowerCase(),

    password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long")
});


export const objectIdSchema = z.string().refine(
    (id) => mongoose.Types.ObjectId.isValid(id),
    {
        message: "Invalid Id"
    }
);

export const getUserByIdSchema = z.object({
    userId: objectIdSchema
});

export const updateUserByIdBodySchema = z.object({
    status: z.enum(['active','inactive','pending'])
});

export const updateUserByIdParamsSchema = z.object({
    userId: objectIdSchema
});