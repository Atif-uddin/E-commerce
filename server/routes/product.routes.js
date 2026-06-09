import express from 'express'
import { validate } from '../middlewares/validate.middleware.js'
import { createProductSchema, getAllProductsSchema } from '../validators/product.validator.js'
import { createProduct, getAllProducts } from '../controllers/product.controller.js'
import { createProductMiddleware } from '../middlewares/product.middleware.js'

const productRouter = express.Router()

productRouter.get('/test',(req, res)=>{
    return res.send({
        success: true,
        message: 'Product Routes is working'
    })
})

//products-related
productRouter.get('/',validate(getAllProductsSchema, "query"), getAllProducts)
// productRouter.get('/:productId',getProductById)

// productRouter.use(authMiddleware) 
// productRouter.use(adminMiddleware)
productRouter.post('/',validate(createProductSchema), createProductMiddleware, createProduct)
// productRouter.put('/:productId', updateProductMiddleware, updateProductById)
// productRouter.delete('/:productId', deleteProductById)

productRouter.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default productRouter