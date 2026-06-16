import express from 'express'
import { adminLoginSchema, deleteUserParamsSchema, getUserByIdSchema, updateUserByIdBodySchema, updateUserByIdParamsSchema } from '../validators/admin.validator.js'
import { validate } from '../middlewares/validate.middleware.js'
import { adminLoginMiddleware, adminMiddleware, deleteUserMiddleware, getUserByIdMiddleware, updateUserByIdMiddleware } from '../middlewares/admin.middleware.js'
import { AdminLogout, deleteUser, getAllUsers, getDashboard, getUserById, loginAdmin, updateUserById } from '../controllers/admin.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'


const adminRouter = express.Router()

adminRouter.get('/',(req, res)=>{
    return res.send({
        success: true,
        message: 'Admin Router is Working'
    })
})

//admin-related
adminRouter.post('/login',validate(adminLoginSchema), adminLoginMiddleware, loginAdmin)

adminRouter.use(authMiddleware, adminMiddleware)

adminRouter.get('/dashboard', getDashboard)

// //user-related
adminRouter.get('/users', getAllUsers)
adminRouter.get('/users/:userId',validate(getUserByIdSchema, 'params'), getUserByIdMiddleware, getUserById)
adminRouter.put('/users/:userId',validate(updateUserByIdParamsSchema, 'params'),
    validate(updateUserByIdBodySchema), updateUserByIdMiddleware, updateUserById)
adminRouter.delete('/users/:userId',validate(deleteUserParamsSchema, 'params'), deleteUserMiddleware, deleteUser)

adminRouter.delete('/logout', AdminLogout)


adminRouter.use((req,res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default adminRouter