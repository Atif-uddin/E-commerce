import { z } from "zod";

//getAllProductsSchema
export const getAllProductsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    category: z.string().optional(),

    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),

    sort: z.enum([
        "price_asc",
        "price_desc",
        "newest",
        "oldest"
    ]).optional()
});

//createProductSchema
export const createProductSchema = z.object({
    name: z.string().min(3, "Name must be more than 3 characters"),
    description: z.string().min(5, "Description must be atleast 5 characters"),

    price: z.number().positive(),
    stock: z.number().min(0),

    images: z.array(
        z.object({
            url: z.string().url(),
            alt: z.string().optional()
        })
    ).optional(),

    brand: z.string().optional(),

    category: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid Category ID"
    )
});