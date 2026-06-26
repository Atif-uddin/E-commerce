import { createContext, useContext, useState, useEffect } from "react";

import { getWishlist } from "../api/wishlist.api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext()

export const WishlistProvider = ({children}) =>{

    const {user} = useAuth()

    const [wishlistCount, setWishlistCount] = useState(0)

    const fetchWishlistCount = async() =>{
        if(!user) {
            setWishlistCount(0)
            return
        }
        try {
            const response = await getWishlist()

            setWishlistCount(response.data.products.length)
        } catch (error) {
            setWishlistCount(0)
        }
    }

    useEffect(() =>{
        fetchWishlistCount()
    },[user])

    return(
        <WishlistContext.Provider
            value={{wishlistCount, fetchWishlistCount}}>
                {children}
            </WishlistContext.Provider>
    )
}

export const useWishlist = () =>{
    return useContext(WishlistContext)
}