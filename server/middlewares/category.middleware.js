import { findCategoryByName } from "../services/category.service.js"


export const createCategoryMiddleware = async(req, res, next) =>{
    try {
        const {name} = req.validatedData || {}
        
        const existingCategory = await findCategoryByName(name)

        if(existingCategory){
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