import { createCategoryService, getAllCategoryService } from "../services/category.service.js";


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

export const getAllCategories = async(req, res) =>{
    try {
        const categories = await getAllCategoryService()
        if(categories.length == 0){
            return res.status(400).send({
                success: false,
                message: 'No Categories Found',
                data: []
            })
        }
        return res.status(200).send({
            success: true,
            data: categories
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server Error"
        })
    }
}