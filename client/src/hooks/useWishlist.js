import { useState } from "react";
import { addToWishlist } from "../api/wishlist.api";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";



const useWishlistHook = () =>{

    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [isWishlisted, setIsWishlisted] = useState(false)
    const {fetchWishlistCount} = useWishlist()

    const addToWishlistHandler = async (productId) => {
        try {
            const response = await addToWishlist(productId);
            setIsWishlisted(true)
            setMessage(response.message)
            fetchWishlistCount()
        } catch (error) {
            if (error.response?.status === 401) {
                navigate("/login");
                return;
            }
            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return{
        message, isWishlisted, addToWishlistHandler
    }
}


export default useWishlistHook