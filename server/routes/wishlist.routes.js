import express from 'express'

const router = express.Router()

router.get('/',(req, res)=>{
    return res.send({
        success: true,
        message: 'Wishlist Route is Working'
    })
})

router.use(authMiddleware)

router.get('/', getWishlist)

router.post('/add/:productId', addToWishlist)
router.post('/move-to-cart', moveToCart)

router.delete('/remove/:productId', removeFromWishlist)

router.delete('/clear', clearWishlist)

router.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})