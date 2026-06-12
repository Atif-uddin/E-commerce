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
