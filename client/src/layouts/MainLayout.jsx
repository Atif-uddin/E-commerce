import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const MainLayout = () => {

    const {user} = useAuth()

    if(user?.role == 'admin'){
        return <Navigate to = '/admin/dashboard' replace />
    }
    return (
        <>
            <Navbar />
            <main className='min-h-screen'>
                < Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout