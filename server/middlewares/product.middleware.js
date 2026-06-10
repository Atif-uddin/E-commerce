import { findCategoryById } from "../services/category.service.js";
import { findProductByNameAndCategory } from "../services/products.service.js";


export const createProductMiddleware = async(req, res, next) =>{
    try {
        const {name, category} = req.validatedData || {}

        const categoryExists = await findCategoryById(category)
        console.log(categoryExists);
        
        if(!categoryExists){
            return res.status(400).send({
                success: false,
                message: 'Category not Found!'
            })
        }

        const existingProduct = await findProductByNameAndCategory(name, category)
        if(existingProduct){
            return res.status(400).send({
                success: false,
                message: 'Product already Exists!'
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