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
import AdminProtectedRoute from './AdminProtectedRoutes'
import AdminLayout from '../layouts/AdminLayout'
import MainLayout from '../layouts/MainLayout'

import Dashboard from '../pages/admin/Dashboard'
import Products from '../pages/admin/Products'
import Categories from '../pages/admin/Categories'
import AdminOrders from '../pages/admin/Orders'
import Users from '../pages/admin/Users'


const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<MainLayout />} >

                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/verify-email' element={<VerifyEmail />} />
                <Route path='/products/:productId' element={<ProductDetails />} />
                <Route path='/category/:slug' element={<CategoryProducts />} />

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
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />
            </Route>

            <Route
                path='/admin'
                element={
                    <AdminProtectedRoute>
                        <AdminLayout />
                    </AdminProtectedRoute>
                }
            >
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='products' element={<Products />} />
                <Route path='categories' element={<Categories />} />
                <Route path='orders' element={<AdminOrders />} />
                <Route path='users' element={<Users />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes