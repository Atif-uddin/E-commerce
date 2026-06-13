import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlist.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { addToWishlistSchema, removeFromWishlistSchema } from '../validators/wishlist.validator.js'
import { addToWishlistMiddleware, removeFromWishlistMiddleware } from '../middlewares/wishlist.middleware.js'

const wishlistRouter = express.Router()

wishlistRouter.get('/test',(req, res)=>{
    return res.send({
        success: true,
        message: 'Wishlist Route is Working'
    })
})

wishlistRouter.use(authMiddleware)

wishlistRouter.get('/', getWishlist)

wishlistRouter.post('/add/:productId',validate(addToWishlistSchema, 'params'), addToWishlistMiddleware, addToWishlist)
// wishlistRouter.post('/move-to-cart', moveToCart)

wishlistRouter.delete('/remove/:productId',validate(removeFromWishlistSchema, 'params'),removeFromWishlistMiddleware, removeFromWishlist)

// wishlistRouter.delete('/clear', clearWishlist)

wishlistRouter.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default wishlistRouter