import { success } from "zod";
import { findCategoryById } from "../services/category.service.js";
import { findProductById, findProductByNameAndCategory } from "../services/products.service.js";


export const createProductMiddleware = async (req, res, next) => {
    try {
        const { name, category } = req.validatedData || {}

        const categoryExists = await findCategoryById(category)
        console.log(categoryExists);

        if (!categoryExists) {
            return res.status(400).send({
                success: false,
                message: 'Category not Found!'
            })
        }

        const existingProduct = await findProductByNameAndCategory(name, category)
        if (existingProduct) {
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


export const updateProductMiddleware = async (req, res, next) => {
    try {
        const { productId } = req.validatedParams

        const updateData = req.validatedData

        const product = await findProductById(productId)
        console.log(product);
        

        if (!product) {
            return res.status(400).send({
                success: false,
                message: 'Product not found'
            })
        }

        if (updateData.category) {
            const category = await findCategoryById(updateData.category)
            console.log(category);
            

            if (!category || !category.isActive) {
                return res.status(400).send({
                    success: false,
                    message: "Category not found!"
                })
            }
        }

        const finalName = updateData.name || product.name
        const finalCategory = updateData.category || product.category.toString()

        const existingProduct = await findProductByNameAndCategory(finalName, finalCategory)
        if (existingProduct && existingProduct._id.toString() != productId) {
            return res.status(400).send({
                success: false,
                message: 'Product already Exists!'
            })
        }
        const hasChanges = Object.keys(updateData).some(
            key =>
                JSON.stringify(updateData[key]) !==
                JSON.stringify(product[key])
        );

        if (!hasChanges) {
            return res.status(400).send({
                success: false,
                message: "No changes detected!"
            });
        }
        req.product = product
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal sever Error'
        })
    }
}

export const deleteProductMiddleware = async(req, res, next) =>{
    try {
        const {productId} =  req.validatedParams

        const product = await findProductById(productId)

        if(!product){
            return res.status(400).send({
                success: false,
                message: "Product not Found!"
            })
        }
        if(!product.isActive){
            return res.status(400).send({
                success: false,
                message: "Product already deleted!"
            })
        }
        req.product = product
        next()
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server Error"
        })
    }
}