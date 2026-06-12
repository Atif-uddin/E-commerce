import { success } from "zod"
import { createOrderService, getAllOrdersService } from "../services/order.service.js"


export const createOrder = async(req, res) =>{
    try {
        const userId = req.user._id
        
        const {shippingAddress} = req.validatedData

        const order = await createOrderService(userId, req.cart, shippingAddress)

        return res.status(201).send({
            success: true,
            message: 'Order Placed Successfully!',
            data: order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}

export const getAllOrders = async(req, res) =>{
    try {
        const userId = req.user._id

        const {page, limit} = req.validatedData

        const orders = await getAllOrdersService(userId, page, limit)
        return res.status(200).send({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}