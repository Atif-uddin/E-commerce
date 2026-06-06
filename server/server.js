import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './utils/dbConnect.js'
import cors from 'cors'
import userRouter from './routes/user.routes.js'

dotenv.config()

const PORT = process.env.PORT

const server = express()
server.use(express.json())

server.use('/api/users',userRouter)
// server.use('/api/admin',adminRouter)
// server.use('/api/products',productRouter)
// server.use('/api/cart',cartRouter)
// server.use('/api/wishlist',wishlistRouter)
// server.use('/api/orders/',orderRouter)

server.listen(PORT, ()=>{
    console.log('Server is running at Port@'+PORT);
})


server.use((req, res)=>{
    return res.status(500).send({
        success: false,
        message: 'Route not found'
    })
})