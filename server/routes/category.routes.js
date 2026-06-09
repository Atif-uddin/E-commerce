import express from 'express'
import { createCategorySchema } from '../validators/category.validator.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createCategoryMiddleware } from '../middlewares/category.middleware.js'
import { createCategory } from '../controllers/category.controller.js'

const categoryRouter = express.Router()

categoryRouter.get('/test',(req, res) =>{
    return res.send({
        success: true,
        message: 'Category route is working fine'
    })
})

// categoryRouter.get('/',getAllCategories)
// categoryRouter.get('/:categoryId', getCategoryById)

// categoryRouter.use(authMiddleware, adminMiddleware)

categoryRouter.post('/',validate(createCategorySchema),createCategoryMiddleware, createCategory)

// categoryRouter.put('/:categoryId', updateCategoryMiddleware, updateCategory)

// categoryRouter.delete('/delete/:categoryId',deleteCategory)

categoryRouter.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default categoryRouter