import express from 'express'
import { createCategorySchema, getCategoryIdSchema, updateCategorySchema } from '../validators/category.validator.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createCategoryMiddleware, deleteCategoryMiddleware, updateCategoryMiddleware } from '../middlewares/category.middleware.js'
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { adminMiddleware } from '../middlewares/admin.middleware.js'

const categoryRouter = express.Router()

categoryRouter.get('/test',(req, res) =>{
    return res.send({
        success: true,
        message: 'Category route is working fine'
    })
})

categoryRouter.get('/',getAllCategories)
categoryRouter.get('/:categoryId',validate(getCategoryIdSchema, 'params'), getCategoryById)

categoryRouter.use(authMiddleware, adminMiddleware)

categoryRouter.post('/',validate(createCategorySchema),createCategoryMiddleware, createCategory)

categoryRouter.put('/:categoryId',validate(updateCategorySchema),validate(getCategoryIdSchema, 'params'),updateCategoryMiddleware, updateCategory)

categoryRouter.delete('/delete/:categoryId',validate(getCategoryIdSchema, 'params'), deleteCategoryMiddleware, deleteCategory)

categoryRouter.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default categoryRouter