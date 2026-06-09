import { createCategoryService } from "../services/category.service.js";


export const createCategory = async(req, res) =>{
    try {
        const category = await createCategoryService(req.validatedData)

        return res.status(201).send({
            success: true,
            message: 'Category created Successfully!',
            data: category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}