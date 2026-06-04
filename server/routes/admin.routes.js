import express from 'express'


const router = express.Router()

router.get('/',(req, res)=>{
    return res.send({
        success: true,
        message: 'Admin Router is Working'
    })
})

//admin-related
router.post('/login',AdminLoginMiddleware, loginAdmin)

router.use(authMiddleware, adminMiddleware)

router.get('/dashboard', getDashboard)

//user-related
router.get('/users', getAllUsers)
router.get('/users/:userId', getUserById)
router.put('/users/:userId', updateUserById)
router.delete('/users/:userId', deleteUser)

router.post('/logout', AdminLogout)


router.use((req,res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})