import { success } from "zod";
import { findCartByUserId } from "../services/cart.service.js";
import { findProductById } from "../services/products.service.js";
import { findOrderById } from "../services/order.service.js";


export const createOrderMiddleware = async(req, res, next) =>{
    try {
        const userId = req.user._id

        const cart = await findCartByUserId(userId)

        if(!cart){
            return res.status(400).send({
                success: false,
                message: 'Cart not Found!'
            })
        }
        if(cart.items.length == 0){
            return res.status(400).send({
                success: false,
                message: 'Cart is Empty!'
            })
        }
        for(const item of cart.items){
            const product = await findProductById(item.product)
            if(!product){
                return res.status(400).send({
                    success: false,
                    message: 'Product not Found!'
                })
            }
            if(!product.isActive){
                return res.status(400).send({
                    success: false,
                    message: `${product.name} is not available!`
                })
            }
            if(item.quantity > product.stock){
                return res.status(400).send({
                    success: false,
                    message: `Only ${product.stock} items are available for ${product.name}`
                })
            }
        }
        req.cart = cart 
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}


export const getOrderByIdMiddleware = async(req, res, next) =>{
    try {
        const userId = req.user._id

        const {orderId} = req.validatedParams
        // console.log(orderId);
        

        const order = await findOrderById(orderId)

        console.log(orderId);
        
        if(!order){
            return res.status(400).send({
                success: false,
                message: 'Order not Found!'
            })
        }
        if(order.user.toString() != userId.toString()){
            return res.status(400).send({
                success: false,
                message: 'You are not authorized to view this Order!'
            })
        }
        req.order = order
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}

export const cancelOrderMiddleware = async(req, res, next) =>{
    try {
        const userId = req.user._id

        const {orderId} = req.validatedParams

        const order = await findOrderById(orderId)
        if(!order){
            return res.status(400).send({
                success: false,
                message: 'Order not Found!'
            })
        }
        if(order.user.toString() != userId.toString()){
            return res.status(400).send({
                success: false,
                message: 'You are not authorized to cancel this order!'
            })
        }
        if(order.orderStatus == 'cancelled'){
            return res.status(400).send({
                success: false,
                message: 'Order already cancelled'
            })
        }
        if(order.orderStatus == 'shipped'){
            return res.status(400).send({
                success: false,
                message: 'shipped orders cannot be cancelled'
            })
        }
        if(order.orderStatus == 'delivered'){
            return res.status(400).send({
                success: false,
                message: 'Delivered orders cannot be cancelled'
            })
        }
        req.order = order
        next()
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'internal server Error'
        })
    }
}