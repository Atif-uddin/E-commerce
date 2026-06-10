import { findCategoryById, findCategoryByName } from "../services/category.service.js"


export const createCategoryMiddleware = async (req, res, next) => {
    try {
        const { name } = req.validatedData || {}

        const existingCategory = await findCategoryByName(name)

        if (existingCategory) {
            return res.status(400).send({
                success: false,
                message: 'Category Already Exists!'
            })
        }
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}

export const updateCategoryMiddleware = async (req, res, next) => {
    try {
        const { categoryId } = req.params
        const { name } = req.validatedData || {}

        const category = await findCategoryById(categoryId)

        if (!category) {
            return res.status(400).send({
                success: false,
                message: "Category not Found"
            })
        }
        if (name) {
            const existingCategory = await findCategoryByName(name)
            if (existingCategory && existingCategory._id.toString() != categoryId) {
                return res.status(400).send({
                    success: false,
                    message: "Category name already Exists"
                })
            }
        }
        const hasChanges = Object.keys(req.validatedData).some(
            key => JSON.stringify(req.validatedData[key]) !== JSON.stringify(category[key])
        )

        if (!hasChanges) {
            return res.status(400).send({
                success: false,
                message: "No changes detected"
            })
        }
        req.category = category
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server Error"
        })
    }
}

export const deleteCategoryMiddleware = async(req, res, next) =>{
    try {
        const {categoryId} = req.validatedParams

        const category = await findCategoryById(categoryId)

        if(!category){
            return res.status(400).send({
                success: false,
                message: "Category not found!"
            })
        }
        if(!category.isActive){
            return res.status(400).send({
                success: false,
                message: "Category already Deleted!"
            })
        }
        req.category = category
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server Error"
        })
    }
}