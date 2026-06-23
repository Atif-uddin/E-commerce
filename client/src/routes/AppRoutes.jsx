import { Routes, Route } from 'react-router-dom'

import Home from '../pages/user/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import VerifyEmail from '../pages/auth/VerifyEmail'
import ProtectedRoute from './ProtectedRoutes'
import ProductDetails from '../pages/user/ProductDetail'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/products/:productId' element={<ProductDetails />} />
        </Routes>
    )
}

export default AppRoutes