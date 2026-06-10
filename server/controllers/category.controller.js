import { createCategoryService, deleteCategoryService, findCategoryByCategoryId, findCategoryById, getAllCategoryService, updateCategoryService } from "../services/category.service.js";


export const createCategory = async (req, res) => {
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

export const getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategoryService()
        if (categories.length == 0) {
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

export const getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.validatedData || {}

        console.log("params:", req.params);
        console.log("validatedData:", req.validatedData);

        const category = await findCategoryByCategoryId(categoryId)

        if (!category) {
            return res.status(400).send({
                success: false,
                message: 'Category not Found!'
            })
        }
        return res.status(200).send({
            success: true,
            data: category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server Error"
        })
    }
}

export const updateCategory = async(req, res) =>{
    try {
        const {categoryId} = req.validatedParams
            console.log(req.validatedData);


        const updatedCategory = await updateCategoryService(categoryId, req.validatedData)

        return res.status(200).send({
            success: true,
            message: 'Category updated Successfully',
            data: updatedCategory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server Error"
        })
    }
}

export const deleteCategory = async(req, res) =>{
    try {
        const {categoryId} = req.validatedParams
        await deleteCategoryService(categoryId)

        return res.status(200).send({
            success: true,
            message: 'Category deleted Successfully!'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Internal server Error"
        })
    }
}