import { success } from "zod";
import { findProductById } from "../services/products.service.js";


export const addToCartMiddleware = async(req, res, next) =>{
    try {
        const {productId, quantity} = req.validatedData

        const product = await findProductById(productId)

        if(!product){
            return res.status(400).send({
                success: false,
                message: 'Product not Found!'
            })
        }
        if(!product.isActive){
            return res.status(400).send({
                success: false,
                message: "Product is Unavailable!"
            })
        }
        if(product.stock < quantity){
            return res.status(400).send({
                success: false,
                message: `only ${product.stock} items available in stock`
            })
        }

        req.product = product
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server Error'
        })
    }
}