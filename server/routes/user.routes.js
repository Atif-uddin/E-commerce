import express from 'express'
import { success } from 'zod'

const router = express.Router()

router.get('/',(req, res)=>{
    return res.send({
        success: true,
        message: 'User router is working'
    })
})



router.use((req, res)=>{
    return res.status(404).send({
        success: false,
        message: 'Route not Found'
    })
})