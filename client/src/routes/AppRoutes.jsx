import { Routes, Route } from 'react-router-dom'

import Home from '../pages/user/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import VerifyEmail from '../pages/auth/VerifyEmail'
import ProtectedRoute from './ProtectedRoutes'
import ProductDetails from '../pages/user/ProductDetail'
import Cart from '../pages/user/Cart'
import Checkout from '../pages/user/Checkout'
import Orders from '../pages/user/Orders'
import OrderDetails from '../pages/user/OrderDetails'
import CategoryProducts from '../pages/user/CategoryProducts'
import Wishlist from '../pages/user/Wishlist'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/products/:productId' element={<ProductDetails />} />
            <Route path='/category/:slug' element = {<CategoryProducts />} />

            {/* Protected Routes */}
            <Route
                path="/cart"
                element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/checkout'
                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/orders'
                element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/orders/:orderId'
                element={
                    <ProtectedRoute>
                        <OrderDetails />
                    </ProtectedRoute>
                }
            />

            <Route 
                path='/wishlist'
                element = {
                    <ProtectedRoute>
                        <Wishlist />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes