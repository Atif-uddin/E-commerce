import api from "./axiosInstance";

export const getAllProducts = async(params = {}) =>{
    const response = await api.get('/products',{params})
    return response.data
}

export const getProductById = async(productId) =>{
    const response = await api.get(`/products/${productId}`)
    return response.data
}