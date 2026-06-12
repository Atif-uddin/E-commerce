import { z } from "zod";

export const addToCartSchema = z.object({
    
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/,"Invalid Product ID"),

    quantity: z.number().int().min(1, "Quantity must be at least 1").default(1)
});

export const getProductIdSchema = z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID")
})

export const updateCartSchema = z.object({quantity: z.number()
    .int("Quantity must be an integer").min(1, "Quantity must be at least 1")
});

export const deleteCartItemSchema = z.object({productId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/,"Invalid Product ID")
});