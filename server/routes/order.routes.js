import express from 'express'
import { validate } from '../middlewares/validate.middleware.js'
import { createOrderSchema, getAllOrdersSchema } from '../validators/order.validator.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createOrderMiddleware } from '../middlewares/order.middleware.js'
import { createOrder, getAllOrders } from '../controllers/order.controller.js'

const orderRouter = express.Router()

orderRouter.get('/test', (req, res) => {
    return res.send({
        success: true,
        message: 'Order Router is Working'
    })
})

//orders-related
orderRouter.use(authMiddleware)
orderRouter.get('/',validate(getAllOrdersSchema, 'query'), getAllOrders)
orderRouter.post('/',validate(createOrderSchema), createOrderMiddleware, createOrder)
// orderRouter.get('/:orderId', getOrderById)
// orderRouter.put('/:orderId/cancel', cancelOrder)


// orderRouter.use(adminMiddleware)
// orderRouter.get('/admin/all',getAllOrdersAdmin)
// orderRouter.put('/admin/:orderId/status', updateOrderStatusById)



orderRouter.use((req, res) => {
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default orderRouter