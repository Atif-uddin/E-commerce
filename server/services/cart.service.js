import { success } from "zod"
import Cart from "../models/cart.js"
import { findProductById } from "./products.service.js"

export const findCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).select('-createdAt -updatedAt -__v')
    return cart
}

export const addToCartService = async (userId, productId, quantity) => {

    let cart = await findCartByUserId(userId)

    const product = await findProductById(productId)

    if (!cart) {
        if (quantity > product.stock) {
            return res.status(400).send({ 
                success: false,
                message: `Only ${product.stock} items available in stock`
            });
        }
        cart = await Cart.create({
            user: userId, items: [{ product: productId, quantity, price: product.price }],
            totalAmount: product.price * quantity
        })
        return await findCartByUserId(userId)
    }

    const existingItem = cart.items.find(item => item.product.toString() == productId)

    if (existingItem) {

        const newQuantity =
            existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
            throw new Error(
                `Only ${product.stock} items available in stock`
            );
        }
        existingItem.quantity = newQuantity;

    } else {

         if (quantity > product.stock) {
            throw new Error(
                `Only ${product.stock} items available in stock`
            );
        }
        cart.items.push({ product: productId, quantity, price: product.price })
    }

    cart.totalAmount = cart.items.reduce(
        (total, item) => total + item.price * item.quantity, 0
    )
    await cart.save()
    return await findCartByUserId(userId)
}



export const getCartService = async (userId) => {

    const cart = await Cart.findOne({user: userId}).populate(
        'items.product',
        'name price images stock'
    ).select('-createdAt -updatedAt -__v');

    return cart;
};