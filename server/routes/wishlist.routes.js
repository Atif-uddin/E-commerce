import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { getWishlist } from '../controllers/wishlist.controller.js'

const wishlistRouter = express.Router()

wishlistRouter.get('/test',(req, res)=>{
    return res.send({
        success: true,
        message: 'Wishlist Route is Working'
    })
})

wishlistRouter.use(authMiddleware)

wishlistRouter.get('/', getWishlist)

// wishlistRouter.post('/add/:productId', addToWishlist)
// wishlistRouter.post('/move-to-cart', moveToCart)

// wishlistRouter.delete('/remove/:productId', removeFromWishlist)

// wishlistRouter.delete('/clear', clearWishlist)

wishlistRouter.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default wishlistRouter