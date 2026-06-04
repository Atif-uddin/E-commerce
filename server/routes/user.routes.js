import express from 'express'

const router = express.Router()

router.get('/',(req, res)=>{
    return res.send({
        success: true,
        message: 'User router is working'
    })
})

//register& login
router.post('/register',registerUserMiddileware,registerUser)
router.post('/login',userLoginMiddleware, userLogin)

//Middleware
router.use(authMiddleware)

//user info
router.get('/details',getUserDetails)
router.put('/update',updateUserMiddleware,updateUserDetails)
router.delete('/delete',deleteUser)

router.post('/logout', userLogout)

router.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})