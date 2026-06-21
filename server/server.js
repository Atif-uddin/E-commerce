import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnect from './config/mongo.config.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import categoryRouter from './routes/category.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'
import wishlistRouter from './routes/wishlist.routes.js'
import adminRouter from './routes/admin.routes.js'

dotenv.config()

const PORT = process.env.PORT

const server = express()

if(process.env.NODE_ENV == 'Development'){
    server.use(cors({
        origin : 'http://localhost:5173',
        credentials: true
    }))
}

server.use(cookieParser())
server.use(express.json())

server.use('/api/users',userRouter)
server.use('/api/admin',adminRouter)
server.use('/api/category',categoryRouter)
server.use('/api/products',productRouter)
server.use('/api/cart',cartRouter)
server.use('/api/wishlist',wishlistRouter)
server.use('/api/orders/',orderRouter)

server.listen(PORT, ()=>{
    console.log('Server is running at Port@'+PORT);
})


server.use((req, res)=>{
    return res.status(500).send({
        success: false,
        message: 'Route not found'
    })
})