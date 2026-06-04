import express from 'express'

const router = express.Router()

router.get('/test',(req, res)=>{
    return res.send({
        success: true,
        message: 'Cart route is working'
    })
})

router.use(authMiddleware)

router.get('/',getCart)

router.post('/add', addToCart)

router.put('/update/:productId/', updateCartItemsById)

router.delete('/remove/:productId', deleteCartItemsById)
router.delete('/clear', clearCart)


router.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: "Route not Found"
    })
})