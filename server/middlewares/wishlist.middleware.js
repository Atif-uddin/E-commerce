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
        console.log(wishlist.products);
        console.log(productId);

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


export const removeFromWishlistMiddleware = async (req, res, next) => {
    try {
        const userId = req.user._id

        const { productId } = req.validatedParams

        const wishlist = await findWishlistByUserId(userId)

        if (!wishlist) {
            return res.status(400).send({
                success: false,
                message: 'Wishlist not Found!'
            })
        }

        const productExists = wishlist.products.some(
            item => item.toString() == productId
        )
        if (!productExists) {
            return res.status(400).send({
                success: false,
                message: 'Product not found in Wishlist!'
            })
        }
        req.wishlist = wishlist
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}

export const clearWishlistMiddleware = async (req, res, next) => {
    try {
        const userId = req.user._id

        const wishlist = await findWishlistByUserId(userId)

        if (!wishlist) {
            return res.status(400).send({
                success: false,
                message: 'Wishlist not Found!'
            })
        }
        if (wishlist.products.length == 0) {
            return res.status(400).send({
                success: false,
                message: 'Wishlist is already empty!'
            })
        }
        req.wishlist = wishlist
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}