import express from 'express'
import { validate } from '../middlewares/validate.middleware.js'
import { cancelOrderSchema, createOrderSchema, getAllOrdersSchema, getOrderIdSchema, updateOrderStatusBodySchema, updateOrderStatusParamsSchema } from '../validators/order.validator.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { cancelOrderMiddleware, createOrderMiddleware, getOrderByIdMiddleware, updateOrderStatusMiddleware } from '../middlewares/order.middleware.js'
import { cancelOrder, createOrder, getAllOrders, getAllOrdersAdmin, getOrderById, updateOrderStatusById } from '../controllers/order.controller.js'

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
orderRouter.get('/:orderId',validate(getOrderIdSchema, 'params'), getOrderByIdMiddleware, getOrderById)
orderRouter.put('/:orderId/cancel',validate(cancelOrderSchema, 'params'), cancelOrderMiddleware, cancelOrder)


// orderRouter.use(adminMiddleware)
orderRouter.get('/admin/all',validate(getAllOrdersSchema, 'query'), getAllOrdersAdmin)
orderRouter.put('/admin/:orderId/status',
    validate(updateOrderStatusParamsSchema, 'params'),
    validate(updateOrderStatusBodySchema), updateOrderStatusMiddleware, updateOrderStatusById)


orderRouter.use((req, res) => {
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default orderRouter