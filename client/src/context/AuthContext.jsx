import { createContext, useContext, useState, useEffect } from "react";
import { getUserDetails } from "../api/user.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
    }
    // console.log("AUTH USER:", user)
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await getUserDetails()
                setUser(response.data)
            } catch (error) {
                // console.log("AUTH ERROR:", error.response?.data)

                setUser(null)
            }finally{
                setAuthLoading(false)
            }
        }
        fetchCurrentUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout, authLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}