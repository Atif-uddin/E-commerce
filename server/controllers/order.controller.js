import { date, success } from "zod"
import { cancelOrderService, createOrderService, getAllOrdersAdminService, getAllOrdersService, updateOrderStatusService } from "../services/order.service.js"


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

export const getOrderById = async(req, res) =>{
    try {
        return res.status(200).send({
            success: true,
            data: req.order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}

export const cancelOrder = async(req, res) =>{
    try {
        const order = req.order
        const cancelOrder = await cancelOrderService(order)

        return res.status(200).send({
            success: true,
            message: 'Order Cancelled Successfully!',
            data: cancelOrder
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}

export const getAllOrdersAdmin = async(req, res) =>{
    try {
        const {page, limit} = req.validatedData

        const orders = await getAllOrdersAdminService(page, limit)
        console.log(orders);
        

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

export const updateOrderStatusById = async(req, res) =>{
    try {
        const {orderStatus} = req.validatedData

        const updatedOrder = await updateOrderStatusService(req.order, orderStatus)

        return res.status(200).send({
            success: true,
            message: 'Order Status updated Successfully!',
            data: updatedOrder
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server Error'
        })
    }
}