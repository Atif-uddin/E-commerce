import express from 'express'
import { validate } from '../middlewares/validate.middleware.js'
import { addToCartSchema, deleteCartItemSchema, updateCartSchema } from '../validators/cart.validator.js'
import { addToCartMiddleware, deleteCartMiddleware, updateCartMiddleware } from '../middlewares/cart.middleware.js'
import { addToCart, deleteCart, getCart, updateCart } from '../controllers/cart.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { getProductIdSchema } from '../validators/product.validator.js'

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
 cartRouter.put('/update/:productId/',validate(getProductIdSchema, 'params'),
  validate(updateCartSchema), updateCartMiddleware, updateCart)
 cartRouter.delete('/remove/:productId',validate(deleteCartItemSchema, 'params'),deleteCartMiddleware, deleteCart) 
//  cartRouter.delete('/clear', clearCart)

 cartRouter.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: "Route not Found"
    })
})

export default cartRouter