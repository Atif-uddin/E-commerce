import express from 'express'

const router = express.Router()

router.get('/test',(req, res)=>{
    return res.send({
        success: true,
        message: 'Product Routes is working'
    })
})

//products-related
router.get('/', getAllProducts)
router.get('/:productId',getProductById)

router.use(authMiddleware, adminMiddleware)
router.post('/', createProductMiddleware, createProduct)
router.put('/:productId', updateProductMiddleware, updateProductById)
router.delete('/:productId', deleteProductById)

router.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})