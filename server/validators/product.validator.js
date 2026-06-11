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

export const getProductIdSchema = z.object({
    productId: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid Product ID"
        )
});


export const updateProductSchema = z.object({
    
    name: z.string().trim().min(3).max(100).optional(),
    description: z.string().min(10).optional(),
    price: z.number().min(0).optional(),
    images: z.array(z.string().url()).optional(),
    stock: z.number().min(0).optional(),
    brand: z.string().trim().optional(),
    category: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid Category ID"
    ).optional(),

    isActive: z.boolean().optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field is required for update"
    }
);