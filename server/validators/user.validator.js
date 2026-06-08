import {z} from "zod";

//updateUserSchema
export const updateUserSchema = z.object({
    fullname : z.string().min(3).optional(),
    phoneNumber : z.string().length(10).optional()
}).strict()