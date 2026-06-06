import express from 'express'
import { registerMiddleware, verifyEmailMiddleware } from '../middlewares/authMiddleware.js'
import { registerUser, resendOtp, verifyEmail } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { registerSchema, resendOtpSchema, verifyEmailSchema } from '../validators/auth.validator.js'

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    return res.send({
        success: true,
        message: 'User router is working'
    })
})

//register& login
userRouter.post('/register',validate(registerSchema), registerMiddleware, registerUser)
userRouter.post('/register/resend-otp',validate(resendOtpSchema), resendOtp)
userRouter.post('/verify-email',validate(verifyEmailSchema), verifyEmailMiddleware, verifyEmail)
// router.post('/login',userLoginMiddleware, userLogin)

//Middleware
// router.use(authMiddleware)

//user info
// router.get('/details',getUserDetails)
// router.put('/update',updateUserMiddleware,updateUserDetails)
// router.delete('/delete',deleteUser)

// router.post('/logout', userLogout)

userRouter.use((req, res) => {
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})

export default userRouter