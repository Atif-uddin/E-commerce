import api from "./axiosInstance";

export const getAllProducts = async(params = {},category) =>{
    const response = await api.get('/products',{params},category)
    return response.data
}

export const getProductById = async(productId) =>{
    const response = await api.get(`/products/${productId}`)
    return response.data
}