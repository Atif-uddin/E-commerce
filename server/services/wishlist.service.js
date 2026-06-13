import Wishlist from "../models/wishlist.js"


export const getWishlistService = async(userId) =>{
    let wishlist = await Wishlist.findOne({user: userId})
    .populate('products', 'name price images stock').select('-__v -createdAt -updatedAt')

    if(!wishlist){
        wishlist ={
            user: userId,
            products: []
        }
    }
    return wishlist
}