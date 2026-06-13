import Cart from "../models/cart.js"
import Wishlist from "../models/wishlist.js"
import { findCartByUserId } from "./cart.service.js"
import { findProductById } from "./products.service.js"


export const getWishlistService = async (userId) => {
    let wishlist = await Wishlist.findOne({ user: userId })
        .populate('products', 'name price images stock').select('-__v -createdAt -updatedAt')

    if (!wishlist) {
        wishlist = {
            user: userId,
            products: []
        }
    }
    return wishlist
}

export const findWishlistByUserId = async (userId) => {
    const wishlist = await Wishlist.findOne({ user: userId })
    return wishlist
}

export const addToWishlistService = async (userId, productId) => {

    let wishlist = await findWishlistByUserId(userId)

    if (!wishlist) {

        wishlist = await Wishlist.create({ user: userId, products: [productId] })
        return await Wishlist.findById(wishlist._id)
            .select('-createdAt -updatedAt -__v');
    }
    wishlist.products.push(productId)

    await wishlist.save()

    return await Wishlist.findById(wishlist._id)
        .select('-createdAt -updatedAt -__v');
}


export const removeFromWishlistService = async (wishlist, productId) => {
    wishlist.products = wishlist.products.filter(
        item => item.toString() != productId
    )
    await wishlist.save()

    const updatedWishlist = await Wishlist.findById(wishlist._id)
        .select('-createdAt -updatedAt -__v');
    return updatedWishlist;
}


export const findWishlistById = async (wishlistId) => {
    return await Wishlist.findById(wishlistId)
        .select('-createdAt -updatedAt -__v');
}


export const clearWishlistService = async (wishlist) => {

    wishlist.products = []

    await wishlist.save()

    return findWishlistById(wishlist._id)
}


export const moveToCartService = async (userId, wishlist) => {
    // console.log("wishlist =>", wishlist);
    // console.log("products =>", wishlist?.products);
    // console.log(Array.isArray(wishlist?.products));

    let cart = await findCartByUserId(userId)

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [],
            totalAmount: 0
        })
    }
    for (const productId of wishlist.products) {

        const product = await findProductById(productId)

        if (!product) continue

        const existingItem = cart.items.find(item =>
            item.product.toString() == productId.toString()
        )
        if (existingItem) continue

        cart.items.push({
            product: productId,
            quantity: 1,
            price: product.price
        })
    }
    cart.totalAmount = cart.items.reduce((total, item) =>
        total + item.price * item.quantity, 0
    )
    await cart.save()

    wishlist.products = []

    await wishlist.save()

    return await Cart.findById(cart._id)
    .select('-createdAt -updatedAt -__v');

}
