import Order from "../models/order.js"
import { findProductById } from "./products.service.js"


export const createOrderService = async(userId, cart, shippingAddress) =>{

    const order = await Order.create({
        user: userId,
        items: cart.items,
        totalAmount: cart.totalAmount,
        shippingAddress
    })

    for(const item of cart.items){

        const product = await findProductById(item.product)

        product.stock -= item.quantity

        await product.save()
    }

    cart.items = []
    cart.totalAmount = 0

    await cart.save()

    return await Order.findById(order._id)
    .select('-createdAt -updatedAt -__v')
}


export const getAllOrdersService = async(userId, page, limit) =>{

    const skip = (page - 1) * limit

    const orders = await Order.find({ user: userId })
    .populate('items.product','name price images')
    .sort({createAt : -1}).skip(skip).limit(limit).select('-__v -createdAt -updatedAt')

    const totalOrders = await Order.countDocuments({user: userId})

    return{
        orders,
        pagination : {
            currentPage: page,
            totalPages: Math.ceil(totalOrders / limit),
            totalOrders,
            limit
        }
    }
}

export const findOrderById = async(orderId) =>{
    const order = await Order.findById(orderId).populate('items.product','name price images')
    .select('-__v -createdAt -updatedAt');
    return order
}