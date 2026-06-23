import api from "./axiosInstance";

export const getAllProducts = async() =>{
    const response = await api.get('/products')
    return response.data
}

export const getProductById = async(productId) =>{
    const response = await api.get(`/products/${productId}`)
    return response.data
}