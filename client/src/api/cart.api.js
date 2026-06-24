import api from "./axiosInstance";

export const getCart = async() =>{
    const response = await api.get('/cart')
    return response.data
}

export const updateCartItem = async(productId, quantity) =>{
    const response = await api.put(`/cart/update/${productId}`,{quantity})
    return response.data
}

export const removeCartItem = async(productId) =>{
    const response = await api.delete(`/cart/remove/${productId}`)
    return response.data
}

export const addToCart = async(data) =>{
    const response = await api.post('/cart/add',data)
    return response.data
}

export const clearCart = async() =>{
    const response = await api.delete('/cart/clear')
    return response.data
}