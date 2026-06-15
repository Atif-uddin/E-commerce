import express from 'express'
import { adminLoginSchema } from '../validators/admin.validator.js'
import { validate } from '../middlewares/validate.middleware.js'
import { adminLoginMiddleware } from '../middlewares/admin.middleware.js'
import { getAllUsers, getDashboard, loginAdmin } from '../controllers/admin.controller.js'


const adminRouter = express.Router()

adminRouter.get('/',(req, res)=>{
    return res.send({
        success: true,
        message: 'Admin Router is Working'
    })
})

//admin-related
adminRouter.post('/login',validate(adminLoginSchema), adminLoginMiddleware, loginAdmin)

// adminRouter.use(authMiddleware, adminMiddleware)

adminRouter.get('/dashboard', getDashboard)

// //user-related
adminRouter.get('/users', getAllUsers)
// adminRouter.get('/users/:userId', getUserById)
// adminRouter.put('/users/:userId', updateUserById)
// adminRouter.delete('/users/:userId', deleteUser)

// adminRouter.post('/logout', AdminLogout)


adminRouter.use((req,res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default adminRouter