import {z} from 'zod'

export const createOrderSchema = z.object({
    shippingAddress : z.string().trim()
    .min(10, 'Shipping Address must be atleast 10 characters!')
    .max(300, 'Shipping Address cannot be more than 300 characters!')
})

export const getAllOrdersSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10)
})