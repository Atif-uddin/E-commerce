import express from 'express'

const router = express.Router()

router.get('/test', (req, res) => {
    return res.send({
        success: true,
        message: 'Order Router is Working'
    })
})

//orders-related
router.use(authMiddleware)
router.get('/',getAllOrders)
router.get('/:orderId', getOrderById)
router.post('/', createOrder)
router.put('/:orderId/cancel', cancelOrder)

router.use(adminMiddleware)
router.get('/all',getAllOrdersAdmin)
router.put('/:orderId/status', updateOrderStatusById)


router.use((req, res) => {
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})