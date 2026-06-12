import { success } from "zod"
import { addToCartService, deleteCartService, getCartService, updateCartService } from "../services/cart.service.js"


export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id

        const { productId, quantity } = req.validatedData

        const cart = await addToCartService(userId, productId, quantity)

        return res.status(200).send({
            success: true,
            message: 'Product added to cart!',
            data: cart
        })
    } catch (error) {
        return res.status(error.statusCode || 500).send({
            success: false,
            message: error.message || "Internal server Error"
        })
    }
}


export const getCart = async (req, res) => {
    try {

        const userId = req.user._id;

        const cart = await getCartService(userId);

        return res.status(200).send({
            success: true,
            data: cart
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const updateCart = async(req, res) =>{
    try {
        const {quantity} = req.validatedData

        const updatedCart = await updateCartService(
            req.cart,
            req.cartItem,
            quantity
        )
        return res.status(200).send({
            success: true,
            message: 'Cart updated Successfully!',
            data: updatedCart
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}

export const deleteCart = async(req, res) =>{
    try {
        const updatedCart = await deleteCartService(req.cart, req.cartItem)

        return res.status(200).send({
            success: true,
            message: 'Product removed from cart!',
            data: updatedCart
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}