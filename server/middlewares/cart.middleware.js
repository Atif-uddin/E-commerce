import { findProductById } from "../services/products.service.js";
import { findCartByUserId } from "../services/cart.service.js";
import { success } from "zod";


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

export const updateCartMiddleware = async(req, res, next) =>{
    try {
        const userId = req.user._id

        const {productId} = req.validatedParams
        const {quantity} = req.validatedData

        const cart = await findCartByUserId(userId)

        if(!cart){
            return res.status(400).send({
                success: false,
                message: 'Cart not Found!'
            })
        }

        const cartItem = cart.items.find(
            item => item.product.toString() == productId
        )
        if(!cartItem){
            return res.status(404).send({
                success: false,
                message: 'Product not Found in the cart!'
            })
        }

        const product = await findProductById(productId)

        if(!product){
            return res.status(404).send({
                success: false,
                message: 'Product not Found!'
            })
        }

        if(quantity > product.stock){
            return res.status(400).send({
                success: false,
                message: `Only ${product.stock} items are available in stock`
            })
        }

        if(cartItem.quantity == quantity){
            return res.status(400).send({
                success: false,
                message: 'No changes detected!'
            })
        }
        req.cart = cart
        req.cartItem = cartItem
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

export const deleteCartMiddleware = async(req, res, next) =>{
    try {
        const userId = req.user._id

        const {productId} = req.validatedParams

        const cart = await findCartByUserId(userId)

        if(!cart){
            return res.status(400).send({
                success: false,
                message: 'Cart not Found!'
            })
        }

        const cartItem = cart.items.find(
            item => item.product.toString() == productId
        )

        if(!cartItem){
            return res.status(404).send({
                success: false,
                message: 'Product not Found in cart!'
            })
        }
        req.cart = cart
        req.cartItem = cartItem
        next()
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}