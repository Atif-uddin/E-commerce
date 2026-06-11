import express from 'express'
import { validate } from '../middlewares/validate.middleware.js'
import { addToCartSchema } from '../validators/cart.validator.js'
import { addToCartMiddleware } from '../middlewares/cart.middleware.js'
import { addToCart, getCart } from '../controllers/cart.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const cartRouter = express.Router()

 cartRouter.get('/test',(req, res)=>{
    return res.send({
        success: true,
        message: 'Cart route is working'
    })
})
 cartRouter.use(authMiddleware)
 cartRouter.get('/',getCart)
 cartRouter.post('/add',validate(addToCartSchema),addToCartMiddleware, addToCart)
//  cartRouter.put('/update/:productId/', updateCartItemsById)
//  cartRouter.delete('/remove/:productId', deleteCartItemsById) 
//  cartRouter.delete('/clear', clearCart)

 cartRouter.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: "Route not Found"
    })
})

export default cartRouter