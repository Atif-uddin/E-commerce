import {z} from 'zod'


export const createCategorySchema = z.object({
    name: z.string().trim().min(3, "Category name must be at least 3 characters")
    .max(50, "Category name cannot exceed 50 characters"),

    description: z.string().max(500, "Description cannot exceed 500 characters").optional(),

    images: z.array(
        z.object({
            url: z.url("Invalid image URL"),
            alt: z.string().optional()
        })
    ).optional()
});


export const getCategoryIdSchema = z.object({
    categoryId: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid Category ID"
    )
});


export const updateCategorySchema = z.object({
    
    name: z.string().trim().min(3, "Category name must be at least 3 characters")
        .max(50, "Category name cannot exceed 50 characters")
        .optional(),

    description: z.string().min(5, "Description must have minimum 3 characters")
    .max(500, "Description cannot exceed 500 characters").optional(),

    images: z.array(
        z.object({
            url: z.url("Invalid image URL"),
            alt: z.string().optional()
        })
    ).optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field is required for update"
    }
);