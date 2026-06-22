import { createContext, useContext, useState, useEffect } from "react";
import { getUserDetails } from "../api/user.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

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
                console.log("AUTH ERROR:", error.response?.data)

                setUser(null)
            }
        }
        fetchCurrentUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}