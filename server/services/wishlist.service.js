import Wishlist from "../models/wishlist.js"


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
    return wishlist
}
