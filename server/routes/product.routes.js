import express from 'express'
import { validate } from '../middlewares/validate.middleware.js'
import { createProductSchema, getAllProductsSchema, getProductIdSchema, updateProductSchema } from '../validators/product.validator.js'
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controllers/product.controller.js'
import { createProductMiddleware, deleteProductMiddleware, updateProductMiddleware } from '../middlewares/product.middleware.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { adminMiddleware } from '../middlewares/admin.middleware.js'

const productRouter = express.Router()

productRouter.get('/test',(req, res)=>{
    return res.send({
        success: true,
        message: 'Product Routes is working'
    })
})

//products-related
productRouter.get('/',validate(getAllProductsSchema, "query"), getAllProducts)
productRouter.get('/:productId',validate(getProductIdSchema, 'params'),getProductById)

productRouter.use(authMiddleware) 
productRouter.use(adminMiddleware)
productRouter.post('/',validate(createProductSchema), createProductMiddleware, createProduct)
productRouter.put('/:productId',validate(updateProductSchema), validate(getProductIdSchema, 'params'), updateProductMiddleware, updateProductById)
productRouter.delete('/delete/:productId',validate(getProductIdSchema, 'params'),deleteProductMiddleware,  deleteProductById)

productRouter.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default productRouter