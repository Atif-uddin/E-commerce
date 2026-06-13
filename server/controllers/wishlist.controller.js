import { success } from "zod";
import { addToWishlistService, getWishlistService } from "../services/wishlist.service.js";


export const getWishlist = async(req, res) =>{
    try {
        const userId = req.user._id

        const wishlist = await getWishlistService(userId)

        return res.status(200).send({
            success: true,
            data: wishlist
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}


export const addToWishlist = async(req, res) =>{
    try {
        const userId = req.user._id

        const {productId} = req.validatedParams

        const wishlist = await addToWishlistService(userId, productId)
        
        return res.status(200).send({
            success: true,
            message: 'Product added to wishlist!',
            data: wishlist
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}