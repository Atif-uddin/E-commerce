import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { useAuth } from './context/AuthContext'
import Loader from './components/common/Loader'

const App = () => {

  const {authLoading} = useAuth()
  
  if(authLoading){
    return <Loader />
  }

  return <AppRoutes />
}

export default App