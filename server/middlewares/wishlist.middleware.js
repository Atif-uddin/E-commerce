import { success } from "zod";
import { findProductById } from "../services/products.service.js";
import { findWishlistByUserId } from "../services/wishlist.service.js";


export const addToWishlistMiddleware = async (req, res, next) => {
    try {
        const userId = req.user._id

        const { productId } = req.validatedParams

        const product = await findProductById(productId)

        if (!product) {
            return res.status(400).send({
                success: false,
                message: 'Product not found!'
            })
        }
        const wishlist = await findWishlistByUserId(userId)
        
        if (wishlist && wishlist.products.some(
            item => item.toString() == productId)) {
            return res.status(400).send({
                success: false,
                message: 'Product already exists in Wishlist!'
            })
        }
        req.product = product
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}