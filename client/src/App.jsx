import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { useAuth } from './context/AuthContext'
import Loader from './components/common/Loader'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

const App = () => {

  const { authLoading } = useAuth()

  if (authLoading) {
    return <Loader />
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-1'>

        <AppRoutes />

      </main>
    </div>
  )
}

export default App